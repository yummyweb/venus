import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react"

export const TicketGrid: React.FC = () => {
    return (
        <Grid templateColumns='repeat(3, 1fr)' mt={10} p={10} gap={6}>
            <GridItem display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" w='100%' h='200' bg='gray.100' shadow="sm" borderRadius={10}>
                <Flex mt={5} flexDirection="column" alignItems="center">
                    <Text fontWeight="bold" fontSize="2xl">Badshaah Concert</Text>
                    <Text>At Ram Auditorium</Text>
                </Flex>
                <Flex w="50%" justifyContent="space-evenly">
                    <Button variant="ghost" colorScheme="messenger">Buy</Button>
                    <Button variant="solid" colorScheme="red">Report</Button>
                </Flex>
            </GridItem>
            <GridItem display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" w='100%' h='200' bg='gray.100' shadow="sm" borderRadius={10}>
                <Flex mt={5} flexDirection="column" alignItems="center">
                    <Text fontWeight="bold" fontSize="2xl">Badshaah Concert</Text>
                    <Text>At Ram Auditorium</Text>
                </Flex>
                <Flex w="50%" justifyContent="space-evenly">
                    <Button variant="ghost" colorScheme="messenger">Buy</Button>
                    <Button variant="solid" colorScheme="red">Report</Button>
                </Flex>
            </GridItem>
            <GridItem display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" w='100%' h='200' bg='gray.100' shadow="sm" borderRadius={10}>
                <Flex mt={5} flexDirection="column" alignItems="center">
                    <Text fontWeight="bold" fontSize="2xl">Adelle Special Event</Text>
                    <Text>At JFK Memoriam Center</Text>
                </Flex>
                <Flex w="50%" justifyContent="space-evenly">
                    <Button variant="ghost" colorScheme="messenger">Buy</Button>
                    <Button variant="solid" colorScheme="red">Report</Button>
                </Flex>
            </GridItem>
            <GridItem display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" w='100%' h='200' bg='gray.100' shadow="sm" borderRadius={10}>
                <Flex mt={5} flexDirection="column" alignItems="center">
                    <Text fontWeight="bold" fontSize="2xl">Badshaah Concert</Text>
                    <Text>At Ram Auditorium</Text>
                </Flex>
                <Flex w="50%" justifyContent="space-evenly">
                    <Button variant="ghost" colorScheme="messenger">Buy</Button>
                    <Button variant="solid" colorScheme="red">Report</Button>
                </Flex>
            </GridItem>
        </Grid>
    )
}