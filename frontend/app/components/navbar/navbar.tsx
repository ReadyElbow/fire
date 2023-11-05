'use client';
import { Box, Button, Group, HoverCard, SimpleGrid, ThemeIcon, Title, Text, UnstyledButton, rem, useMantineTheme, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    Icon,
    IconChevronRight,
    IconSettings,
} from '@tabler/icons-react';
import classes from './navbar.module.css'
import { RecordMenu, TSubMenu } from '../../../../frontend-remix/app/components/Navbar/menuDetails';


type TDropdownItems = {
    icon: Icon
    title: string
    description: string
}[]

interface IDropdownItems {
    dropdownItems: TDropdownItems,
    dropdownTitle: string
}



function GenerateSubMenu(subMenuDetails: TSubMenu){

}

function GenerateMenu({dropdownItems, dropdownTitle}: IDropdownItems) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme =  useMantineTheme();

    const links = dropdownItems.map(item => {
        return <UnstyledButton key={item.title} className={classes.navbarChildPages} p={theme.spacing.sm}>
            <Group wrap='nowrap' justify='flex-start'>
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    });

    return <HoverCard width={500} radius="md" shadow="md" withinPortal transitionProps={{ transition:'scale-y', duration: 150, timingFunction: 'linear' }}>
        <HoverCard.Target>
            <Box className={classes.navbarParentPages}>
                {dropdownTitle}
                <IconChevronRight
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
                className={classes.icon}
                />
            </Box>
        </HoverCard.Target>
        <HoverCard.Dropdown>
            <SimpleGrid cols={2} spacing="xs">
                {links}
            </SimpleGrid>
        </HoverCard.Dropdown>
    </HoverCard>
}

export function PageNavbar() {
    return <Box>
        <header className={classes.header}>
            <Title order={1}>🔥 FIRE</Title>
            <Group>
                <Box className={classes.navbarParentPages} component='a' href='/'>Home</Box>
                <GenerateMenu dropdownItems={RecordMenu} dropdownTitle='Analysis' />
                <Box className={classes.navbarParentPages} component='a' href='/'>Budget</Box>
                <GenerateMenu dropdownItems={RecordMenu} dropdownTitle='Record' />
            </Group>
            <Button variant="default" leftSection={<IconSettings size="1rem" stroke={1.5} />}>Configuration</Button>
        </header>
    </Box>
}
    