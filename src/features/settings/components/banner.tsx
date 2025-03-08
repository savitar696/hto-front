import { Box, Flex, IconButton, Image, Skeleton } from "@chakra-ui/react"
import { Avatar } from "@shared/ui/avatar"
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "@components/ui/dialog"
import { AddIcon } from "@shared/ui/icons/Icons"
import { api } from "@shared/lib/api"
import { toaster } from "@components/ui/toaster"
import { FileUploadDropzone, FileUploadRoot } from "@components/ui/file-button"
import { forwardRef, useRef, useState } from "react"
import { useSettings } from "../hooks"

const ForwardedIconButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>((props, ref) => <IconButton ref={ref} {...props} />)

export const Banner = ({ username }: { username: string }) => {
  const { properties, isLoading: isSettingsLoading } = useSettings(username)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const buttonRef = useRef()

  const handleSubmit = async (file: File) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const uploadPromise = api.put("/storage/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      toaster.promise(uploadPromise, {
        loading: {
          title: "Загрузка баннера...",
        },
        success: {
          title: "Баннер успешно загружен",
          description: "Обновите страницу, чтобы увидеть новый баннер",
        },
        error: (error: any) => ({
          title: "Ошибка при загрузке баннера",
          description:
            error.response?.data?.message || "Ошибка при загрузке баннера",
        }),
      })

      await uploadPromise
      setIsOpen(false)
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (files: File[]) => {
    if (files.length > 0 && files[0]) {
      handleSubmit(files[0])
    }
  }

  return (
    <Box position="relative" height="260px" width="100%" mb="48px">
      <Box
        position="absolute"
        borderRadius="16px"
        overflow="hidden"
        inset="0"
        zIndex={1}
        backgroundColor="rgba(22, 22, 26, 0.03)"
      >
        <Skeleton
          height="260px"
          width="100%"
          mb="48px"
          loading={isSettingsLoading}
        >
          <Image
            src={properties?.banner_url || "https://i.imgur.com/saiCDyI.jpeg"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt="Cover"
          />

          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            zIndex={10}
            opacity={1}
            transition="all 0.15s ease-in-out"
            _hover={{ opacity: 1 }}
            onClick={() => setIsOpen(true)}
          >
            <DialogRoot
              placement="center"
              motionPreset="scale"
              open={isOpen}
              onOpenChange={() => setIsOpen(!isOpen)}
            >
              <DialogTrigger asChild>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="16px"
                  backgroundColor="rgba(22, 22, 26, 0.6)"
                  cursor="pointer"
                  opacity={0}
                  width="100%"
                  height="100%"
                  backdropFilter="blur(6px)"
                  transition="all 0.15s ease-in-out"
                  _hover={{ opacity: 1 }}
                  _active={{ transform: "scale(0.95)" }}
                >
                  <ForwardedIconButton
                    ref={buttonRef as unknown as React.Ref<HTMLButtonElement>}
                    aria-label="Edit Cover"
                    width="40px"
                    height="40px"
                    backgroundColor="rgba(255, 255, 255, 0.1)"
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    borderRadius="14px"
                  >
                    <AddIcon />
                  </ForwardedIconButton>
                </Flex>
              </DialogTrigger>

              <DialogContent>
                <FileUploadRoot
                  maxW="xl"
                  alignItems="stretch"
                  maxFiles={1}
                  onFileAccept={(files) => handleFileChange(files.files)}
                  disabled={isLoading}
                >
                  <DialogBody
                    flex="1"
                    alignItems="center"
                    justifyContent="center"
                    p="8"
                    cursor={isLoading ? "progress" : "pointer"}
                  >
                    <FileUploadDropzone
                      label={
                        "Загрузите новую обложку для страницы вашего профиля. Мы рекомендуем загружать изображения в разрешении 1463x300. Максимум 5мб."
                      }
                    />
                  </DialogBody>
                </FileUploadRoot>
              </DialogContent>
            </DialogRoot>
          </Box>
        </Skeleton>
      </Box>

      <Box position="absolute" bottom="-30px" left="24px" zIndex={10}>
        <Flex
          alignItems="center"
          justifyContent="center"
          height="132px"
          width="132px"
          border="1px solid white"
          backgroundColor="white"
          borderRadius="100%"
        >
          <Avatar
            username={username}
            styles={{ width: "123px", height: "123px", margin: "-5px" }}
          />
        </Flex>
      </Box>
    </Box>
  )
}
