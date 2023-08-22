"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { Billboard } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "./image-upload";

interface BillboardsFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().url(),
});

type BillboardsFormData = z.infer<typeof formSchema>;

export default function BillboardsForm({ initialData }: BillboardsFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<BillboardsFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const dynamicAttributes = initialData
    ? {
        title: "Edit billboards",
        description: "Edit a billboard",
        toastMessage: "Billboard updated",
        action: "Save changes",
      }
    : {
        title: "Create billboard",
        description: "Create a billboard",
        toastMessage: "Billboard created",
        action: "Create",
      };

  const onSubmit = async (data: BillboardsFormData) => {
    try {
      setLoading(true);

      if (initialData)
        await axios.patch(`/api/stores/${params.storeId}/billboards`, data);
      else
        await axios.post(
          `/api/stores/${params.storeId}/billboards/${params.billboardId}`,
          data,
        );

      router.refresh();
      toast.success(dynamicAttributes.toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onConfirm = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `/api/stores/${params.storeId}/billboards/${params.billboardId}`,
      );
      router.refresh();
      router.push("/");

      toast.success("Store deleted");
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this billboard first",
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={onConfirm}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={dynamicAttributes.title}
          description={dynamicAttributes.description}
        />
        {initialData && (
          <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    disabled={loading}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="Billboard label"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {dynamicAttributes.action}
          </Button>
        </form>
      </Form>
    </>
  );
}
