"use client"
import { trpc } from "@/trpc/provider"
import { Empty } from "./Empty"
import { PetItem } from "./PetItem"
import { PrismaClient } from "@prisma/client"
import { Pet } from "@prisma/client";

const PetList = ({ initialData }: { initialData: Pet[] }) => {
    const getPets = trpc.getPets.useQuery(undefined, { initialData: initialData, refetchOnMount: false, refetchOnReconnect: false })
    return (<>
        {getPets.data?.length === 0 ? <Empty /> :
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">My Pets</h1>
                {getPets.data?.map(pet => <PetItem key={pet.name} id={pet.id} name={pet.name} owner={pet.owner} />)
                }
            </div>
        }
    </>)
}

export default PetList