import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

function Profile() {
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const { name, email } = formData;

  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // update display name
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (err) {
      console.log(err, "error")
      toast.error("could not update the profile details");
    }
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center my-6 font-bold">My Profile</h1>
        <div className="">
          <form>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out disabled:bg-gray-200 ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />
            <input
              type="email"
              name="name"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out disabled:bg-gray-200"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1  cursor-pointer"
                >
                  {changeDetail ? "Apply Change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
