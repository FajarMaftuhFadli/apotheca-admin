"use client";

import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export default function StoreModal() {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Store"
      description="Store to manage product"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future store
    </Modal>
  );
}
