import { useNavigate, useParams } from "react-router-dom";
import InfoField from "../components/InfoField";
import { useEffect, useState } from "react";
import type { User } from "@repo/shared";
import Loading from "../components/Loading";
import { api } from "../lib/api";
import axios from "axios";
import { toast } from "react-toastify";

export default function ViewUserPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const res = await api.get(`/api/users/${id}`);
            setUser(res.data.data);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                        toast.error(
                            error.response?.data?.message || "Failed to load user"
                        );
                } else {
                    toast.error("Failed to load user");
                }
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
  }, [id, navigate]);

    if(loading) {
        return <div className="flex justify-center items-center h-screen">
            <Loading/>
        </div>
    }

    if(!user) return null

    return <div className="px-3 py-4 md:mb-10">
        <div className="text-center mb-5">
            <h2 className=" text-gray-800 font-medium text-2xl mb-2 lg:text-3xl ">
                User Details
            </h2>
            <p className="text-gray-700 lg:text-lg">
                Complete profile information for the selected user
            </p>
        </div>
        
        <div className="w-full max-w-2xl mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-b-md">
            <div className="mb-5">
                <h1 className="text-center font-semibold text-lg text-white bg-table-head p-2 rounded-t-md py-3 leading-loose tracking-wider lg:text-2xl">
                    User Details
                </h1>
            </div>

            {/* avatar */}
            <div className="flex flex-col items-center gap-y-3 mb-4">
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                    <svg
                        className="w-12 h-12 md:w-16 md:h-16 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
                <div className="flex flex-col items-center gap-y-1 md:gap-y-1.5">
                    <p className="font-medium text-xl lg:text-2xl">{user.lastName + " " + user.firstName}</p>
                    <p className="text-gray-600 font-medium text-base">
                        ID: #{user._id}
                    </p>
                    <p className={`text-white capitalize font-semibold px-3 py-1.5 rounded-4xl mt-1.5 ${user.status === 'active' ? 'bg-green-600' : "bg-red-500"}`}>
                        {user.status}
                    </p>
                </div>
            </div>

            <div className="section-divider" />

            <div className="px-6 py-6">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField
                        label="Email Address"
                        value={user.email}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                            </svg>
                        }
                    />
                    <InfoField
                        label="Mobile Number"
                        value={user.mobile}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                            </svg>
                        }
                    />
                </div>
            </div>

            <div className="section-divider" />

            <div className="px-6 py-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField
              label="Gender"
              value={user.gender}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
            />
            <InfoField
              label="Location"
              value={user.location}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
            />
          </div>
        </div>
        </div>
    </div>
}