import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useUpdateStudent } from "~/api/students";

export default function EditStudentDialog({ children, student }: { children: React.ReactNode; student: any }) {
  const updateStudent = useUpdateStudent();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(student.name);
  const [surname, setSurname] = React.useState(student.surname);
  const [email, setEmail] = React.useState(student.email || "");
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    setName(student.name);
    setSurname(student.surname);
    setEmail(student.email || "");
  }, [student, open]);

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || !surname.trim()) {
      return setError("Name and surname are required.");
    }

    await updateStudent.mutateAsync({
      id: student.serial_hash,
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim() || null,
    });

    setOpen(false);
  }, [name, surname, email, student.serial_hash, updateStudent]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>Make changes to student details here.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 flex-col">
          <div className="w-full grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="w-full grid gap-2">
            <Label htmlFor="surname">Surname</Label>
            <Input id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div className="w-full grid gap-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        {error && <div className="text-destructive text-sm text-center">{error}</div>}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
