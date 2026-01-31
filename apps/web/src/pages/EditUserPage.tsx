import type { User, UserFormData } from "@repo/shared";
import UserForm from "../components/UserForm";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../lib/api";
import axios from "axios";



export default function EditUserPage() {
    const [loading, setLoading] = useState(false)
    const {id} = useParams<{id: string}>()
    const [data, setData] = useState<User>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const res = await api.get(`/api/users/${id}`);
            setData(res.data.data);
        } catch (error:unknown) {
            if(error instanceof Error) {
                toast.error(error.message || "Failed to load user");
            }
            else {
                toast.error("Failed to load user");
            }
            navigate("/");  
            
        } finally {
            setLoading(false);
        }
        };

        if (id) fetchUser();
    }, [id, navigate]);

    const handleUpdate = async (formData: UserFormData) => {
        try {
            await api.put(`/api/users/${id}`, formData);

            toast.success("User updated successfully");
            navigate("/");
            } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(
                error.response?.data?.message || "Failed to update user"
                );
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    if(loading) {
        return <div className="h-screen flex justify-center items-center">
            <Loading/>
        </div>
    }
    return <UserForm initialValues={data} onSubmit={handleUpdate} isEdit={true}/>
}