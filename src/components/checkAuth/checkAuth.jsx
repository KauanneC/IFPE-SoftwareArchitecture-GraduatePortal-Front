import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import jwt from 'jsonwebtoken';

const checkAuthVerify = () => {
    const token = localStorage.getItem('token');
    if (token) {
        // Verifica se o token é válido
        const decoded = jwt.decode(token);
        if (decoded) {
            console.log(decoded);
            return decoded;
        } else {
            console.error("Token inválido");
            return false;
        }
    } else {
        console.error("Token não encontrado");
        return false;
    }
};

const CheckAuth = ({ allowedAccess, children }) => {
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const user = await checkAuthVerify();
                if (user && allowedAccess.includes(user.profile)) {
                    setLoading(false);
                    setUserProfile(user.profile);
                } else {
                    setLoading(false);
                    handleAccessDenied();
                }
            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
                setLoading(false);
                handleAuthenticationError();
            }
        }

        fetchData();
    }, []);

    const handleAccessDenied = () => {
        Swal.fire({
            icon: "error",
            iconColor: "#991D39",
            title: "Erro!",
            text: "Você não tem permissão para acessar esta página!",
            confirmButtonText: "Voltar para a página inicial",
            confirmButtonColor: "#242B63",
        }).then(() => {
            router.push("/");
        });
    };

    const handleAuthenticationError = () => {
        Swal.fire({
            icon: "error",
            iconColor: "#991D39",
            title: "Erro!",
            text: "Erro ao verificar autenticação!",
            confirmButtonText: "Voltar para a página inicial",
            confirmButtonColor: "#242B63",
        }).then(() => {
            router.push("/");
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-azulBase"></div>
                <p className="text-legenda text-azulBase mt-2">Carregando...</p>
            </div>
        );
    }

    return (
        <>
            {userProfile && allowedAccess.includes(userProfile) && (
                <>
                    {children}
                </>
            )}
        </>
    );
};

export default CheckAuth;
