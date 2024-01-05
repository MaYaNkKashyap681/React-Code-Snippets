// ModelPortal.tsx


import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom"

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const ModelPortal: React.FC<{
  children: React.ReactNode,
  wrappedId: string
}> = ({children, wrappedId}) => {

    const [wrappedElement, setWrappedElement] = useState<HTMLElement>();

    useLayoutEffect(() => {
      let element = document.getElementById(wrappedId);
      let systemCreated = false;

      if(!element) {
        systemCreated = true
        element = createWrapperAndAppendToBody(wrappedId)
      }
      setWrappedElement(element!);

      return () => {
        if(systemCreated && element?.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    }, [wrappedId])

    if(!wrappedElement) return null;
    return createPortal(children, wrappedElement)
}

export default ModelPortal



// Model



import { useEffect } from "react"
import ModelPortal from "../molecules/ModelPortal"

type ModelProps = {
  children: React.ReactNode,
  isOpen: boolean,
  handleClose: () => void
}

const Modal: React.FC<ModelProps> = ({
  children, isOpen, handleClose
}) => {

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the clicked element is the modal's background (not the content)
    if ((e.target as HTMLDivElement).classList.contains("modal-background")) {
      handleClose();
    }
  };

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.addEventListener("keydown", closeOnEscapeKey);
    }
  }, [handleClose])


  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return (): void => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null;

  return (
    <ModelPortal wrappedId="popup-item-element">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000] bg-opacity-40 flex flex-col items-center justify-center z-[1000] p-[40px] overflow-hidden modal-background"
        onClick={handleModalClick}
      >
        <button onClick={handleClose}>
          Close
        </button>
        <div className="w-[70%] h-[70%] bg-white flex items-center justify-center ">{children}</div>
      </div>
    </ModelPortal>
  )
}

export default Modal



// Actual Place using It




import { useState } from 'react'
import Modal from '../components/organisms/Modal';

const DesignSystem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <button onClick={() => setIsOpen(true)}>
          Click to Open Modal
        </button>

        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          This is Modal Content!
        </Modal>
      </header>
    </div>
  );
}

export default DesignSystem
