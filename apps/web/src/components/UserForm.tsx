import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_VALUES, STATUS_VALUES, GENDER_VALUES, type UserFormData, userSchema } from "@repo/shared";
import Avatar from "./Avatar";

type UserFormProps = {
  initialValues?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  isEdit?: boolean;
};

export default function UserForm({ initialValues, onSubmit, isEdit = false }: UserFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues || DEFAULT_VALUES,
  });

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  const profileFile = useWatch({
  control,
  name: "profile",
});


  return <div className="min-h-screen">
        <main className="py-8 px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            {isEdit ? "Edit Your Info" : "Register Your Details"}
          </h1>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 md:p-8">
            <div className="flex justify-center mb-6">
            <Avatar/>
          </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              
              {/* Row 1: Names */}
              <div className="form-grid gap-4 mb-4">
                <div className="flex-1">
                  <label className="user-form-label">First name</label>
                  <input
                    {...register("firstName")}
                    placeholder="Enter FirstName"
                    className={`user-form-input ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="user-form-label">Last Name</label>
                  <input
                    {...register("lastName")}
                    placeholder="Enter LastName"
                    className={`user-form-input ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Row 2: Contact */}
              <div className="form-grid gap-4 mb-4">
                <div className="flex-1">
                  <label className="user-form-label">Email address</label>
                  <input
                    {...register("email")}
                    placeholder="Enter Email"
                    className={`user-form-input ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="user-form-label">Mobile</label>
                  <input
                    {...register("mobile")}
                    placeholder="Enter Mobile"
                    className={`user-form-input ${errors.mobile ? 'border-red-500' : ''}`}
                  />
                  {errors.mobile && <p className="form-error">{errors.mobile.message}</p>}
                </div>
              </div>

              {/* Row 3: Gender & Status */}
              <div className="form-grid gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Gender</label>
                  <div className="space-y-2">
                    {GENDER_VALUES.map((g) => (
                      <label key={g} className="flex items-center capitalize">
                        <input {...register("gender")} type="radio" value={g} className="mr-2" />
                        {g}
                      </label>
                    ))}
                  </div>
                  {errors.gender && <p className="form-error">{errors.gender.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="user-form-label">Select Your Status</label>
                  <select {...register("status")} className="user-form-input bg-white capitalize">
                    <option value="">Choose Status</option>
                    {STATUS_VALUES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.status && <p className="form-error">{errors.status.message}</p>}
                </div>
              </div>

              {/* Row 4: Profile & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="user-form-label">Select Your Profile</label>
                  <div className="flex items-center">
                    <label className="cursor-pointer bg-gray-100 border border-gray-300 rounded-l-md px-4 py-2 text-sm hover:bg-gray-200 transition-colors">
                      Choose file
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;

                          setValue("profile", file, { shouldValidate: true });
                        }}
                      />
                    </label>
                    <span className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-500 bg-white truncate">
                      
                      {profileFile instanceof File 
                        ? profileFile.name 
                        : ( "No file chosen")
                      }
                    </span>
                  </div>

                  {errors.profile && <p className="form-error">{String(errors.profile.message)}</p>}
                </div>

                <div className="flex-1">
                  <label className="user-form-label">Enter Your Location</label>
                  <input
                    {...register("location")}
                    placeholder="Enter Your Location"
                    className={`user-form-input ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.location && (
                    <p className="form-error">{errors.location.message}</p>
                  )}
                </div>

            </div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-medium py-2 rounded-md transition cursor-pointer"
              >
                {isEdit ? "Update Info" : "Submit Details"}
              </button>
            </form>
          </div>
        </main>
      </div>
}