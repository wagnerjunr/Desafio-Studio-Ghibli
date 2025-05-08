'use client'

import * as React from 'react'

import { cn, useMediaQuery } from '@/lib/utils'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

interface BaseProps {
  children: React.ReactNode
}

interface RootModalProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface ModalProps extends BaseProps {
  className?: string
  asChild?: true
}

const desktop = '(min-width: 768px)'

const Modal = ({ children, ...props }: RootModalProps) => {
  const isDesktop = useMediaQuery(desktop)
  const Modal = isDesktop ? Dialog : Drawer

  return <Modal {...props}>{children}</Modal>
}

const ModalTrigger = ({ className, children, ...props }: ModalProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ModalTrigger = isDesktop ? DialogTrigger : DrawerTrigger

  return (
    <ModalTrigger className={className} {...props}>
      {children}
    </ModalTrigger>
  )
}

const ModalClose = ({ className, children, ...props }: ModalProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ModalClose = isDesktop ? DialogClose : DrawerClose

  return (
    <ModalClose className={className} {...props}>
      {children}
    </ModalClose>
  )
}

const ModalContent = ({ className, children, ...props }: ModalProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ModalContent = isDesktop ? DialogContent : DrawerContent

  return (
    <ModalContent
      className={cn(
        'w-full p-4 md:p-8 md:rounded-3xl md:border border-border bg-card',
        className,
      )}
      {...props}
    >
      {children}
    </ModalContent>
  )
}

const ModalDescription = ({ className, children, ...props }: ModalProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ModalDescription = isDesktop ? DialogDescription : DrawerDescription

  return (
    <ModalDescription
      className={cn('text-sm text-neutral', className)}
      {...props}
    >
      {children}
    </ModalDescription>
  )
}

const ModalHeader = ({ className, children, ...props }: ModalProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ModalHeader = isDesktop ? DialogHeader : DrawerHeader

  return (
    <ModalHeader className={cn('p-0 pb-2', className)} {...props}>
      {children}
    </ModalHeader>
  )
}

const ModalTitle = ({ className, children, ...props }: ModalProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ModalTitle = isDesktop ? DialogTitle : DrawerTitle

  return (
    <ModalTitle
      className={cn(
        'text-xl md:text-2xl w-full text-left font-semibold',
        className,
      )}
      {...props}
    >
      {children}
    </ModalTitle>
  )
}

const ModalBody = ({ className, children, ...props }: ModalProps) => {
  return (
    <div className={cn('px-4 md:px-0', className)} {...props}>
      {children}
    </div>
  )
}

const ModalFooter = ({ className, children, ...props }: ModalProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ModalFooter = isDesktop ? DialogFooter : DrawerFooter

  return (
    <ModalFooter className={className} {...props}>
      {children}
    </ModalFooter>
  )
}

export {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
}
