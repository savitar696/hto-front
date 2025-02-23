import { Button, ButtonGroup, EmptyState, VStack } from "@chakra-ui/react"
import { MdError } from "react-icons/md"
import { FC } from "react"

interface NotFoundI {
  title: string;
  description: string;
}

export const ErrorPage: FC<NotFoundI> = ({ title, description }) => {
  return (
    <EmptyState.Root size={"lg"}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <MdError />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>
            {description}
          </EmptyState.Description>
        </VStack>
        <ButtonGroup>
          <Button variant="outline"><a href={"/"}>Вернуться назад</a></Button>
          <Button colorPalette={"cyan"}><a href={"/"}>Поддержка</a></Button>
        </ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}