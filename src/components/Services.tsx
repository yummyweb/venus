import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Box,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
  IoTicketSharp
} from 'react-icons/io5';
import {
  BsFillCalendarEventFill
} from "react-icons/bs"
import { ReactElement } from 'react';
import Parallax from "./Parallax"

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
	<Stack direction={'row'} align={'center'}>
	  <Flex
		w={8}
		h={8}
		align={'center'}
		justify={'center'}
		rounded={'full'}
		bg={iconBg}>
		{icon}
	  </Flex>
	  <Text fontWeight={600}>{text}</Text>
	</Stack>
  );
};

export const Services = () => {
  return (
	<Container maxW={'7xl'} py={36}>
	  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
		<Stack spacing={4}>
		  <Text
			textTransform={'uppercase'}
			color={'red.400'}
			fontWeight={600}
			fontSize={'sm'}
			bg={useColorModeValue('red.50', 'red.900')}
			p={2}
			alignSelf={'flex-start'}
			rounded={'md'}>
			Our Story
		  </Text>
		  <Heading>A ticket booking application</Heading>
		  <Text color={'gray.500'} fontSize={'lg'}>
			Debook came into existence from the NEAR MetaBUILD hackathon. 
			We are focused on solving the problem of ticket scalping and fraud.
		  </Text>
		  <Stack
			spacing={4}
			divider={
			  <StackDivider
				borderColor={useColorModeValue('gray.100', 'gray.700')}
			  />
			}>
			<Feature
			  icon={
				<Icon as={BsFillCalendarEventFill} color={'yellow.500'} w={4} h={4} />
			  }
			  iconBg={useColorModeValue('yellow.100', 'yellow.900')}
			  text={'Host an event'}
			/>
			<Feature
			  icon={<Icon as={IoTicketSharp} color={'purple.500'} w={5} h={5} />}
			  iconBg={useColorModeValue('purple.100', 'purple.900')}
			  text={'Book tickets'}
			/>
			<Feature
			  icon={
				<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />
			  }
			  iconBg={useColorModeValue('green.100', 'green.900')}
			  text={'Pay through crypto'}
			/>
		  </Stack>
		</Stack>
		<Flex>
			<Image
				rounded="md"
				alt={'feature image'}
				src={
					'https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
				}
				objectFit={'cover'}
			/>
		</Flex>
	  </SimpleGrid>
	</Container>
  );
}
