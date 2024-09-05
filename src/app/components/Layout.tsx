'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link'

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    { name: 'Profile', href: '/profile', icon: UsersIcon, current: false },

]
const teams = [
    { name: 'Engineering', href: '#', initial: 'E', current: true },
]
const userNavigation = [
    { name: 'Your profile', href: '/profile' },
    { name: 'Sign out', href: '/api/auth/logout' },
]

interface LayoutProps {
    children: React.ReactNode
}



const Layout = ({ children }: LayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, error, isLoading } = useUser();

    return (
        <>
            {
                user ? (
                    <div>
                        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                            <DialogBackdrop
                                transition
                                className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                            />

                            <div className="fixed inset-0 flex">
                                <DialogPanel
                                    transition
                                    className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                                >
                                    <TransitionChild>
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                            <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                            </button>
                                        </div>
                                    </TransitionChild>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <img
                                                alt="Your Company"
                                                src="/logo_meru.png"
                                                className="h-8 w-auto"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <Link
                                                                    href={item.href}
                                                                    className={clsx(
                                                                        item.current
                                                                            ? 'bg-gray-50 text-orange-600'
                                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        aria-hidden="true"
                                                                        className={clsx(
                                                                            item.current ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-600',
                                                                            'h-6 w-6 shrink-0',
                                                                        )}
                                                                    />
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                        {teams.map((team) => (
                                                            <li key={team.name}>
                                                                <a
                                                                    href={team.href}
                                                                    className={clsx(
                                                                        team.current
                                                                            ? 'bg-gray-50 text-orange-600'
                                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                                    )}
                                                                >
                                                                    <span
                                                                        className={clsx(
                                                                            team.current
                                                                                ? 'border-indigo-600 text-orange-600'
                                                                                : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-orange-600',
                                                                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                                                        )}
                                                                    >
                                                                        {team.initial}
                                                                    </span>
                                                                    <span className="truncate">{team.name}</span>
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li className="mt-auto">
                                                    <Link
                                                        href="#"
                                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                                                    >
                                                        <Cog6ToothIcon
                                                            aria-hidden="true"
                                                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-orange-600"
                                                        />
                                                        Logout
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </DialogPanel>
                            </div>
                        </Dialog>

                        {/* Static sidebar for desktop */}
                        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="Your Company"
                                        src="/logo_meru.png"
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className={clsx(
                                                                item.current
                                                                    ? 'bg-gray-50 text-orange-600'
                                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={clsx(
                                                                    item.current ? 'text-orange-600' : 'text-orange-600 group-hover:text-orange-800',
                                                                    'h-6 w-6 shrink-0',
                                                                )}
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li>
                                            <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                {teams.map((team) => (
                                                    <li key={team.name}>
                                                        <Link
                                                            href={team.href}
                                                            className={clsx(
                                                                team.current
                                                                    ? 'bg-gray-50 text-orange-600'
                                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                            )}
                                                        >
                                                            <span
                                                                className={clsx(
                                                                    team.current
                                                                        ? 'border-indigo-600 text-orange-600'
                                                                        : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-orange-600',
                                                                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                                                )}
                                                            >
                                                                {team.initial}
                                                            </span>
                                                            <span className="truncate text-orange-600">{team.name}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="mt-auto">
                                            <Link
                                                href="/api/auth/logout"
                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                                            >
                                                <Cog6ToothIcon
                                                    aria-hidden="true"
                                                    className="h-6 w-6 shrink-0 text-orange-400 group-hover:text-orange-600"
                                                />
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="lg:pl-72">
                            <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
                                <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
                                    <button
                                        type="button"
                                        onClick={() => setSidebarOpen(true)}
                                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                                    >
                                        <span className="sr-only">Open sidebar</span>
                                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                                    </button>

                                    {/* Separator */}
                                    <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

                                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                                        <form action="#" method="GET" className="relative flex flex-1">
                                            <label htmlFor="search-field" className="sr-only">
                                                Search
                                            </label>
                                            <MagnifyingGlassIcon
                                                aria-hidden="true"
                                                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                            />
                                            <input
                                                id="search-field"
                                                name="search"
                                                type="search"
                                                placeholder="Search..."
                                                className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                            />
                                        </form>
                                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                                            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon aria-hidden="true" className="h-6 w-6" />
                                            </button>

                                            {/* Separator */}
                                            <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative">
                                                <MenuButton className="-m-1.5 flex items-center p-1.5">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img
                                                        alt=""
                                                        src={user?.picture ?? "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"}
                                                        className="h-8 w-8 rounded-full bg-gray-50"
                                                    />

                                                    <span className="hidden lg:flex lg:items-center">
                                                        <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                                                            {user?.name}
                                                        </span>
                                                        <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                                                    </span>
                                                </MenuButton>
                                                <MenuItems
                                                    transition
                                                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                                >
                                                    {userNavigation.map((item) => (
                                                        <MenuItem key={item.name}>
                                                            <Link
                                                                href={item.href}
                                                                className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </MenuItem>
                                                    ))}
                                                </MenuItems>
                                            </Menu>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <main className="py-10">
                                <p className="text-center px-10 text-gray-900">{isLoading ? "Loading..." : error ? error.message : user ? `Welcome, ${user.name}` : "Welcome, Guest"}</p>
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
                            </main>
                        </div>
                    </div>
                ) : (
                    <main className="flex items-center justify-center h-screen bg-zinc-800">
                        <div className="max-w-2xl w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:px-6 bg-gray-200">
                                    <h3 className="text-3xl font-semibold leading-6 text-gray-900">Welcome to Meru</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Please sign in to continue
                                    </p>
                                </div>
                                <div className="px-4 py-5 sm:px-6">
                                    <Link
                                        href="/api/auth/login"
                                        className="block w-full px-4 py-2 text-center font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md shadow-sm hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
                                    >
                                        Sign in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>

                )
            }

        </>
    )
}


export default Layout;