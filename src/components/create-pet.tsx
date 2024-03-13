"use client";
import { trpc } from "@/trpc/provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
export const CreatePet = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const createPet = trpc.createPet.useMutation({
        onSuccess: () => {
            router.refresh();
            setName("")
            setOwner("")
        },
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            createPet.mutate({ name, owner });
        }} className="flex gap-4 md:flex-row flex-col">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your pet name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="owner"
                        placeholder="Your name"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>
            </div>
            <button
                type="submit"
                className={`btn btn-active ${createPet.isLoading && "btn-disabled"}`}
                aria-disabled={createPet.isLoading}
            >
                Add Your Pet
            </button>
        </form>
    );
};
