import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import UserTable from "../components/UserTable";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Link, useSearchParams } from "react-router-dom";
import type { Status, User } from "@repo/shared";
import Loading from "../components/Loading";
import axios from "axios";
import { toast } from "react-toastify";



export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1)
  const page = Number(searchParams.get('page')) || 1
  const search = searchParams.get('search') || ""

  function handleUserStatus(userId: string, newStatus: Status) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId
          ? { ...user, status: newStatus }
          : user
      )
    );
  }

const handleDeleteUser = async (userId: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) return;

  try {
    await api.delete(`/api/users/${userId}`);

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== userId)
    );

    toast.success("User deleted successfully");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Failed to delete user"
      );
    } else {
      toast.error("Failed to delete user");
    }
  }
};

  const exportToCSV = () => {
  const link = document.createElement("a");
  link.href = `${import.meta.env.VITE_API_BASE_URL}/api/users/export`;
  link.setAttribute("download", "UserList.csv"); 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/users", {
        params: { search, page},
      });

      setUsers(res.data.data);
      setTotalPages(res.data.pagination.totalPages)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, search])


  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("searchInput") as string;
    setSearchParams({
      search: searchValue,
      page: Number(1).toString()
    })
  };

  if(loading) {
    return <div className="min-h-screen flex justify-center items-center">
      <Loading/>
    </div>
  }

  return <div className='p-3 lg:max-w-7xl mx-auto min-h-screen'>

    {/* form */}
    <div className='min-[500px]:flex min-[500px]:justify-between min-[500px]:items-center h-9 lg:h-10 mb-8'>
      <form className='flex gap-x-2 mb-5 min-[500px]:m-0 lg:gap-x-3' onSubmit={handleSearchSubmit}>
        <input 
          type='search'
          name="searchInput"
          defaultValue={search}
          className='flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base outline-none md:text-sm font-semibold md:px-4 md:w-72 md:h-10'
          placeholder='Search'
        /> 
        <button type='submit' className='bg-primary text-white grow px-3 rounded-md cursor-pointer'>
          <Search className='h-4 w-4 md:hidden'/>
          <span className='hidden md:inline-block font-semibold text-lg px-2'>Search</span>
        </button>
      </form>

      <div className='flex items-center gap-3 md:gap-3.5 lg:gap-5 relative z-10'>
        <Link to={'/add'} className='action-btn cursor-pointer'>
          <Plus className='h-3 w-3 md:h-4 md:w-4'/> 
          Add User
        </Link>

        <button className="action-btn cursor-pointer" onClick={exportToCSV}>
          Export To Csv
        </button>

      </div>
    </div>

    {/* table */}
    <UserTable users= {users} handleUserStatus={handleUserStatus} onDelete = {handleDeleteUser}/>

    <div className="flex items-center justify-end mt-4">
      <button
        onClick={() => setSearchParams({search, page: String(page-1)})}
        disabled={page === 1}
        className="pagination-btn disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button className="pagination-btn bg-primary text-white">
        {page}
      </button>
      <button
        onClick={() => setSearchParams({search, page: String(page+1)})}
        disabled={page >= totalPages}
        className="pagination-btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
}