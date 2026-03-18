import { useEffect, useRef, ReactNode } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

export interface DialogModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  ariaLabel?: string;
  children: ReactNode;

  // Behavior
  closeOnEsc?: boolean; // default: true
  closeOnBackdrop?: boolean; // default: true
  showCloseButton?: boolean; // default: true

  // Layout
  width?: string; // default: "min(90vw, 900px)"
  height?: string; // default: "min(85vh, 800px)"
  padding?: string; // default: "16px"
  fullBleed?: boolean; // if true, content fills the panel (no padding)
  initialFocusRef?: React.RefObject<HTMLElement>; // focus this on open if provided
}

const DialogModal = ({
  isOpen,
  onClose,
  title,
  ariaLabel,
  children,
  closeOnEsc = true,
  closeOnBackdrop = true,
  showCloseButton = true,
  width = "min(90vw, 900px)",
  height = "min(85vh, 800px)",
  padding = "16px",
  fullBleed = false,
  initialFocusRef,
}: DialogModalProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const titleIdRef = useRef(`dialog-title-${Math.random().toString(36).slice(2, 9)}`);

  // Restore focus to the last focused element after close
  useEffect(() => {
    if (!isOpen) return;

    lastFocusedRef.current = document.activeElement as HTMLElement;

    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus management
    const focusTarget =
      initialFocusRef?.current ?? panelRef.current ?? null;

    // Defer focus to after paint
    const t = window.setTimeout(() => {
      focusTarget?.focus?.();
    }, 0);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true } as any);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnBackdrop) return;
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const ariaProps =
    title
      ? { "aria-labelledby": titleIdRef.current }
      : { "aria-label": ariaLabel ?? "Dialog" };

  const content = (
    <Overlay
      ref={overlayRef}
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <Panel
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        {...ariaProps}
        $width={width}
        $height={height}
        $padding={fullBleed ? "0" : padding}
      >
        {(title || showCloseButton) && (
          <Header>
            {title && <Title id={titleIdRef.current}>{title}</Title>}
            {showCloseButton && (
              <CloseButton
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
              >
                ×
              </CloseButton>
            )}
          </Header>
        )}

        <Body $fullBleed={fullBleed}>{children}</Body>
      </Panel>
    </Overlay>
  );

  // Render into a portal to avoid stacking-context issues
  return ReactDOM.createPortal(content, document.body);
};

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.98) }
  to { opacity: 1; transform: translateY(0) scale(1) }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  animation: ${fadeIn} 120ms ease-out;
`;

const Panel = styled.div<{
  $width: string;
  $height: string;
  $padding: string;
}>`
  position: relative;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  max-width: 100vw;
  max-height: 100vh;

  display: flex;
  flex-direction: column;

  background: #1f242c; /* match app background */
  color: #f0f0f0;
  border: 1px solid #d8beff;
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  padding: ${({ $padding }) => $padding};

  font-family: "IBM Plex Mono", monospace;

  animation: ${scaleIn} 140ms ease-out;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 4px 8px 4px;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0 6px;
  font-size: 1rem;
  font-weight: 700;
  color: #d8beff;
`;

const CloseButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  color: #86f0d1;
  font-size: 1.5rem;
  line-height: 1;
  padding: 4px 8px;
  margin: 0;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    color: #d8beff;
    background: rgba(216, 190, 255, 0.08);
  }

  &:focus {
    outline: 2px solid #86f0d1;
    outline-offset: 2px;
  }
`;

const Body = styled.div<{ $fullBleed: boolean }>`
  position: relative;
  display: block;
  flex: 1 1 auto;
  overflow: auto;
  border-radius: 6px;
  ${({ $fullBleed }) => ($fullBleed ? "" : "background: #1b2027; padding: 8px;")}

  /* If embedding iframes or PDFs, they can take full size of the body */
  & > iframe, & > embed, & > object {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
`;

export default DialogModal;
