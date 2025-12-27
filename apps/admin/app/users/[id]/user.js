"use client";

import { PopUpBox } from "@shared/components/ui/Boxes";
import { Button, IconButton } from "@shared/components/ui/Button";
import { Input } from "@shared/components/ui/Input";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function UserClientPage({ user }) {
  const [pop, setPop] = useState("");

  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          src={user?.profilePic ?? "https://i.ibb.co/1JGDTytY/default-Profile-Pic.webp"}
          width={140}
          height={140}
          alt={`Profile Pic`}
          unoptimized
        />
        <div>
          <div className="relative">
            <h2 className="text-xl flex items-center">
              {user.name} ({!user.isVerified && "Not"} Verified)
              <IconButton className="m-0" onClick={() => setPop("details")}>
                <CiEdit />
              </IconButton>
            </h2>
            <p className="text-xs">
              <strong>Email: </strong>
              {user.email}
            </p>
            <p className="text-xs">
              <strong>User ID: </strong>
              {user.id}
            </p>
          </div>
          <h3 className="text-lg flex items-center">
            Balance
            <IconButton className="m-0" onClick={() => setPop("balance")}>
              <CiEdit />
            </IconButton>
          </h3>
          <ul className="list-disc ml-5">
            <li>Diamond: {user.balance?.diamond || 0}</li>
            <li>Coin: {user.balance?.coin || 0}</li>
            <li>Life: {user.balance?.life || 0} </li>
          </ul>
        </div>
      </div>
      <pre className="w-[calc(100vw-40px)] p-3 overflow-x-scroll shadow no-scrollbar">
        {JSON.stringify(user, null, 2)}
      </pre>

      <UserDetailsEditPopUp user={user} pop={pop} setPop={setPop} />

      <div className="h-200" />
    </>
  );
}

function UserDetailsEditPopUp({ user, pop, setPop }) {
  const [formState, setFormState] = useState({ name: "", email: "" });
  const [actionState, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(formData);

      // Simulate delay (remove in production)
      await new Promise((res) => setTimeout(res, 1000));

      // ✅ Normally, you would save to DB here...

      return {
        status: "success",
        message: "User created successfully!",
      };
    },
    {
      status: null, // 'success' | 'error' | null
      message: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((p) => ({ ...p, [name]: value }));
    // console.log(name, "=", value);
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  // Reset form if submit succeeded
  useEffect(() => {
    if (actionState.status === "success") {
      setFormState({ name: "", email: "" });
    }
  }, [actionState]);
  // if (pop)
  return (
    <PopUpBox visible={!!pop} closeable={!isPending} onClose={() => setPop("")}>
      <form action={formAction} onChange={handleChange} className="p-2">
        <fieldset disabled={isPending}>
          <input defaultValue={pop} hidden disabled />
          {pop === "details" && (
            <div className="flex flex-col items-center">
              <Image
                src={user?.profilePic ?? "https://i.ibb.co/1JGDTytY/default-Profile-Pic.webp"}
                width={140}
                height={140}
                alt={`Profile Pic`}
                unoptimized
              />
              <div className="flex gap-2 w-full">
                <Input defaultValue={user.name} name="name" label="Name" />
              </div>
              <Input defaultValue={user.email} name="email" label="Email" />
            </div>
          )}
          {pop === "balance" && (
            <div>
              <div className="w-full flex text-lg [&_input]:hidden">
                <input
                  type="radio"
                  name="balanceID"
                  id="radioDiamond"
                  value="diamond"
                  className="peer/diamond"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="balanceID"
                  id="radioCoin"
                  value="coin"
                  className="peer/coin"
                />
                <input
                  type="radio"
                  name="balanceID"
                  id="radioLife"
                  value="life"
                  className="peer/life"
                />
                <Button
                  htmlFor="radioDiamond"
                  className="w-full bg-transparent text-inherit peer-checked/diamond:bg-theme-450 peer-checked/diamond:text-white rounded-none m-0"
                >
                  Diamond
                </Button>
                <Button
                  htmlFor="radioCoin"
                  className="w-full bg-transparent text-inherit peer-checked/coin:bg-theme-450 peer-checked/coin:text-white rounded-none m-0"
                >
                  Coin
                </Button>
                <Button
                  htmlFor="radioLife"
                  className="w-full bg-transparent text-inherit peer-checked/life:bg-theme-450 peer-checked/life:text-white rounded-none m-0"
                >
                  Life
                </Button>
              </div>
              <div className="w-full flex text-lg [&_input]:hidden mt-2">
                <input
                  type="radio"
                  name="actionId"
                  id="radioAdd"
                  value="add"
                  className="peer/add"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="actionId"
                  id="radioRemove"
                  value="remove"
                  className="peer/remove"
                />
                <Button
                  htmlFor="radioAdd"
                  className="w-full bg-transparent text-inherit peer-checked/add:bg-theme-450 peer-checked/add:text-white rounded-none m-0"
                >
                  + Add
                </Button>
                <Button
                  htmlFor="radioRemove"
                  className="w-full bg-transparent text-inherit peer-checked/remove:bg-theme-450 peer-checked/remove:text-white rounded-none m-0"
                >
                  - Remove
                </Button>
              </div>
              <Input type="number" name="amount" label="Amount" />
            </div>
          )}
          {/* Feedback message */}
          {actionState.message && (
            <p
              className={`text-sm ${
                actionState.status === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {actionState.message}
            </p>
          )}
          <div className="flex mx-2 justify-end *:rounded-full">
            <Button type="reset" disabled={isPending}>
              Reset
            </Button>
            <Button type="submit" loading={isPending}>
              Save
            </Button>
          </div>
        </fieldset>
      </form>
    </PopUpBox>
  );
}
