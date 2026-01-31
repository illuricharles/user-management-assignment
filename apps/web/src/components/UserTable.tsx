import { UserIcon } from "lucide-react";
import StatusDropdown from "./StatusDropDown";
import ActionMenu from "./ActionMenu";
import type { Status, User } from "@repo/shared";
import { api } from "../lib/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

type UserTableProps = {
    users: User[], 
    handleUserStatus: (userId: string, newStatus: Status) => void,
    onDelete: (userId: string) => void
}

export default function UserTable({users, handleUserStatus, onDelete}: UserTableProps) {
    
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)
    const navigate = useNavigate()
    async function handleStatusUpdate(status: Status, userId: string) {
        const currentUser = users.find(user => user._id === userId)
        if(currentUser && currentUser.status === status) return
        try {
            setUpdatingUserId(userId)
            await api.patch(`/api/users/${userId}/status`, {
            status
            });
            handleUserStatus(userId, status)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                    toast.error(
                        error.response?.data?.message || "Failed to update status"
                    );
                } else if (error instanceof Error) {
                    toast.error(error.message || "Failed to update status");
                } else {
                    toast.error("Failed to update status");
                }   
            }
        finally {
            setUpdatingUserId(null)
        }
    }

    return <div className="table-container ">
      <table className="w-full mt-12 min-[500px]:mt-0 ">
        <thead>
          <tr className="bg-table-head text-white">
            <th className="text-left py-3 px-4 font-semibold text-sm">ID</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">FullName</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Gender</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Profile</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
          </tr>
        </thead>

        <tbody>
            {users.map(eachUser => {
                const {_id, firstName, lastName, email, gender, status}  = eachUser
                return <tr key={_id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="table-cell-label">{_id}</td>
                <td className="table-cell-label">{firstName + " " + lastName}</td>
                <td className="table-cell-label">{email}</td>
                <td className="table-cell-label capitalize">{gender}</td>
                <td className="py-3 px-4 w-11">
                    {updatingUserId === _id && <div>
                        Updating...
                    </div>}
                    {updatingUserId !== _id && <StatusDropdown
                    status={status}
                    onChange={handleStatusUpdate}
                    userId={_id}
                    />}
                </td>
                <td className="py-3 px-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                    </div>
                </td>
                <td className="py-3 px-4">
                    <ActionMenu
                    onView={() => navigate(`/view/${_id}`)}
                    userId={_id}
                    onEdit={() => navigate(`/edit/${_id}`)}
                    onDelete={() => onDelete(_id)}
                    />
                </td>
            </tr>
            })}
        </tbody>
        
    </table>
</div>
}