import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { classNames } from "shared/lib/ClassNames/classNames";
import mainClasses from "./Modal.module.scss";
import { Portal } from "shared/ui/Portal";
import { useModal } from "app/providers/ModalProvider";

interface ModalProps {
  someClasses?: string;
  children: ReactNode;
  id: string;
}

const Modal: FC<ModalProps> = ({ someClasses, children, id }) => {
  const { isModalOpen, toggleModalHandler, modalId } = useModal();
  const [canClose, setCanClose] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(true);

  const closeModal = () => {
    if (canClose) {
      return toggleModalHandler(false);
    }
    return;
  };
  const onPressEscapeHandler = (e: KeyboardEvent) => {
    if (
      (e.key === "Escape" && isModalOpen) ||
      (e.key === "Space" && isModalOpen)
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    setCanClose(false);

    const timeout = setTimeout(() => {
      setCanClose(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, [isModalOpen]);

  useEffect(() => {
    window.addEventListener("keydown", onPressEscapeHandler);
    return () => window.removeEventListener("keydown", onPressEscapeHandler);
  }, [isModalOpen]);

  // useEffect(() => {
  //   if (isModalOpen) {
  //     setIsMounted(true);
  //   }
  //   return () => setIsMounted(false);
  // }, [isModalOpen]);

  return (
    <>
      {isMounted ? (
        <Portal>
          {modalId === id ? (
            <aside
              className={classNames(
                mainClasses.Modal,
                {
                  [mainClasses.opened]: isModalOpen,
                  [mainClasses.closed]: !isModalOpen,
                },
                [someClasses],
              )}
            >
              <div
                onClick={closeModal}
                className={classNames(mainClasses.overlay, {}, [])}
              >
                <div
                  onClick={e => e.stopPropagation()}
                  className={classNames(mainClasses.content, {}, [])}
                >
                  {children}
                </div>
              </div>
            </aside>
          ) : null}
        </Portal>
      ) : null}
    </>
  );
};

export default Modal;
