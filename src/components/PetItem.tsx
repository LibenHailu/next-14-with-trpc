import { trpc } from "@/trpc/provider";
import { useRouter } from "next/navigation";

type PetItemProps = {
    id: string
    name: string;
    owner: string;
};
export const PetItem: React.FC<PetItemProps> = ({ id, name, owner }) => {
    const router = useRouter();
    const deletePet = trpc.deletePet.useMutation({
        onSuccess: () => {
            router.refresh();
        }
    })
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <div>
                        <input className="card-title disabled" name="name" defaultValue={name} />
                        <input className="hidden" defaultValue={owner} name="owner" />
                        <p className="text-sm">{owner}</p>
                    </div>
                    <div>
                        <button onClick={() => deletePet.mutate({ id })} className="btn btn-active">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
