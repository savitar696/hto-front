import { Box, Flex, IconButton, Image } from "@chakra-ui/react"
import { Avatar } from "@components/avatar"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "@components/ui/dialog"
import { FileUploadDropzone, FileUploadRoot } from "@components/ui/file-button"
import { AddIcon } from "@shared/ui/icons/Icons"
import { useSettings } from "../hooks"

export const Banner = ({ username }: { username: string }) => {
  const { properties } = useSettings(username)
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
        <Image
          src={properties.banner_url || "https://i.imgur.com/27QbtQt.png"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
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
        >
          <DialogRoot placement="center" motionPreset="scale">
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
                <IconButton
                  aria-label="Edit Cover"
                  width="40px"
                  height="40px"
                  backgroundColor="rgba(255, 255, 255, 0.1)"
                  border="1px solid rgba(255, 255, 255, 0.08)"
                  borderRadius="14px"
                >
                  <AddIcon />
                </IconButton>
              </Flex>
            </DialogTrigger>
            <DialogContent>
              <DialogBody
                flex="1"
                alignItems="center"
                justifyContent={"center"}
                p="12"
              >
                <FileUploadRoot
                  alignItems="stretch"
                  maxFiles={1}
                  cursor="pointer"
                  accept={["image/png,", "image/jpeg"]}
                  onFileChange={async (file) => {
                    if (file.acceptedFiles.length > 0) {
                      console.log(file.acceptedFiles)
                    }
                  }}
                >
                  <FileUploadDropzone
                    label="Загрузите новую обложку для страницы вашего профиля."
                    description="Мы рекомендуем загружать изображения в разрешении 1463x300. Максимум 5мб."
                  />
                </FileUploadRoot>
              </DialogBody>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </Box>
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
