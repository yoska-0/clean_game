import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import apiFutrues from "../../lib/api";

export default function AlertDialogDestructive(props) {
  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent size="sm" className="bg-[var(--bg-blue)]">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-white">
            حذف التعليق
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            هل أنت متأكد من رغبتك في حذف التعليق
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-[var(--bg-blue)]">
          <AlertDialogCancel
            variant="outline"
            onClick={() => props.setOpen(false)}
          >
            ألغاء
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={async function () {
              await apiFutrues.deleteReview(props.id);
              props.setOpen(false);
              window.location.reload();
            }}
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
