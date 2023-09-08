import { useNavigate } from "react-router-dom"

const useCustomNavigateHook = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const goBack = () => {
        navigate(-1);
    }

    const goToSignup = () => {
        navigate('/')
    }

    const goToLogin = () => {
        navigate('/login')
    }

    const goToRoute = (routePath: string) => {
        navigate(routePath);
    };

    return {
        goToRoute, goToHome, goToLogin, goToSignup, goBack
    }
}

export { useCustomNavigateHook };
