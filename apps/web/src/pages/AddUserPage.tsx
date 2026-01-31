import type { UserFormData } from "@repo/shared";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import {toast} from "react-toastify"
import axios from "axios";

export default function AddUserPage() {
  const navigate = useNavigate()
  const handleAddUser = async (data: UserFormData) => {
    try {
      await api.post("/api/users", data);

      toast.success("User created successfully");

      // Redirect to list page
      navigate("/");
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to create user"
        );
      } else {
        toast.error("Something went wrong");
      }
    }
  };
    return <UserForm onSubmit={handleAddUser}/>
}