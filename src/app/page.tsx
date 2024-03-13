import Image from "next/image";
import PetList from "@/components/PetList";
import { CreatePet } from "@/components/create-pet";
import { serverClient } from "@/trpc/server-client";

export default async function Home() {
  const pets = await serverClient.getPets()
  return (
    <main className="mx-auto max-w-xl my-14">
      <CreatePet />
      <PetList initialData={pets} />
    </main>
  );
}
