import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Ellipsis } from "lucide-react";

export default function StudentComponent({ student }: { student: any }) {
  return (
    <div className="p-3 pl-4 border bg-card rounded-md flex items-center justify-between h-fit">
      <div className="font-medium">{`${student.name} ${student.surname}`}</div>
      <Button variant="outline" size="icon" asChild>
        <Link to={`${student.serial_hash}`}>
          <Ellipsis />
        </Link>
      </Button>
    </div>
  );
}
