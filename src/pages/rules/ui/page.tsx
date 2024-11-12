import { Box, Heading, Icon, List, Text } from "@chakra-ui/react"
import ReactMarkdown from "react-markdown"
import rulesText from "./rules.md?raw"
import { CgChevronRight } from "react-icons/cg"
import { useColorModeValue } from "@components/ui/color-mode"
import { Prose } from "@components/ui/prose"
import Markdown from "react-markdown"

// export const RulesPage = () => {
//   const bg = useColorModeValue("gray.100", "#0F0E14");
//   const textColor = useColorModeValue("black", "white");
//   return (
//     <Box padding={4} maxWidth="800px" mx="auto">
//       <ReactMarkdown
//         components={{
//           h1: ({ node, ...props }) => (
//             <Heading as="h1" size="2xl" mt={4} mb={2} {...props} />
//           ),
//           h2: ({ node, ...props }) => (
//             <Heading
//               as="h2"
//               size="xl"
//               fontWeight="400"
//               mt={4}
//               mb={2}
//               {...props}
//             />
//           ),
//           h3: ({ node, ...props }) => (
//             <Heading
//               as="h3"
//               size="lg"
//               fontWeight="300"
//               mt={4}
//               mb={2}
//               {...props}
//             />
//           ),
//           h4: ({ node, ...props }) => (
//             <Heading
//               as="h4"
//               size="md"
//               fontWeight="300"
//               mt={4}
//               mb={2}
//               {...props}
//             />
//           ),
//           p: ({ node, ...props }) => <Text mb={2} {...props} />,
//           ul: ({ node, ...props }) => (
//             <List.Root spaceY={3} listStyleType="none" pl={4} {...props} />
//           ),
//           li: ({ node, ...props }) => (
//             <List.Item display="flex" alignItems="center" mb={2}>
//               <Icon fontSize="2xl" color="blue.500" mr={2}>
//                 <CgChevronRight />
//               </Icon>
//               <span {...props} />
//             </List.Item>
//           ),
//           hr: ({ node }) => (
//             <Box
//               as="hr"
//               border="0"
//               borderTop="2px solid"
//               borderColor="gray.300"
//               my={4}
//               mx="auto"
//               width="100%"
//             />
//           ),
//           blockquote: ({ node, ...props }) => (
//             <Box
//               as="blockquote"
//               borderLeft="4px solid"
//               borderColor="blue.500"
//               pl={4}
//               my={4}
//               fontStyle="italic"
//               backgroundColor={bg}
//               color={textColor}
//               {...props}
//             />
//           ),
//         }}
//       >
//         {rulesText}
//       </ReactMarkdown>
//     </Box>
//   );
// };

export const RulesPage = () => {
  return (
    <Prose padding={4} maxWidth="800px" mx="auto">
      <Markdown>{rulesText}</Markdown>
    </Prose>
  )
}
