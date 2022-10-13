import { BiBox, BiChalkboard, BiFile, BiImage } from 'react-icons/bi';

export interface IMenuItem {
    text: string;
    link: string | null;
    icon: any;
    items: IMenuItem[] | null;
}

// export const SUPERADMIN_ITEMS: IMenuItem[] = [
//   {
//     text: "Dashboard",
//     link: "/cms/superadmin",
//     icon: <BiChalkboard />,
//     items: [],
//   },
//   {
//     text: "Cộng tác viên",
//     link: null,
//     icon: <BiGroup />,
//     items: [
//       {
//         text: "Quản lý cộng tác viên",
//         link: "/cms/superadmin/collaborators",
//         icon: null,
//         items: [],
//       },
//       {
//         text: "Báo cáo doanh số",
//         link: "/cms/superadmin/collaborators/reports",
//         icon: null,
//         items: [],
//       },
//     ],
//   },
//   {
//     text: "Đơn hàng",
//     link: "/cms/superadmin/orders",
//     icon: <BiCart />,
//     items: [],
//   },
//   {
//     text: "Quản lý Admin",
//     link: "/cms/superadmin/admins",
//     icon: <BiUserCircle />,
//     items: [],
//   },
//   {
//     text: "Thông điệp",
//     link: "/cms/superadmin/messages",
//     icon: <BiBroadcast />,
//     items: [],
//   },
//   {
//     text: "Cấu hình",
//     link: "/cms/superadmin/configurations",
//     icon: <BiCog />,
//     items: [],
//   },
//   {
//     text: "Leader",
//     link: null,
//     icon: <BiStar />,
//     items: [
//       {
//         text: "Quản lý Leader",
//         link: "/cms/superadmin/leaders",
//         icon: null,
//         items: [],
//       },
//       {
//         text: "Báo cáo",
//         link: "/cms/superadmin/leaders/reports",
//         icon: null,
//         items: [],
//       },
//     ],
//   },
// ];

// export const ADMIN_ITEMS: IMenuItem[] = [
//   {
//     text: "Dashboard",
//     link: "/cms/admin",
//     icon: <BiChalkboard />,
//     items: [],
//   },
//   {
//     text: "Cộng tác viên",
//     link: null,
//     icon: <BiGroup />,
//     items: [
//       {
//         text: "Quản lý cộng tác viên",
//         link: "/cms/admin/collaborators",
//         icon: null,
//         items: [],
//       },
//       {
//         text: "Báo cáo doanh số",
//         link: "/cms/admin/collaborators/reports",
//         icon: null,
//         items: [],
//       },
//     ],
//   },
//   {
//     text: "Thông điệp",
//     link: "/cms/admin/messages",
//     icon: <BiBroadcast />,
//     items: [],
//   },
//   {
//     text: "Đơn hàng",
//     link: "/cms/admin/orders",
//     icon: <BiCart />,
//     items: [],
//   },
//   {
//     text: "Quản lý thưởng Mini Game",
//     link: "/cms/admin/minigame",
//     icon: <BiGame />,
//     items: [],
//   },
//   {
//     text: "Leader",
//     link: null,
//     icon: <BiStar />,
//     items: [
//       {
//         text: "Quản lý Leader",
//         link: "/cms/admin/leaders",
//         icon: null,
//         items: [],
//       },
//       {
//         text: "Báo cáo",
//         link: "/cms/admin/leaders/reports",
//         icon: null,
//         items: [],
//       },
//     ],
//   },
// ];

export const EDITOR_ITEMS: IMenuItem[] = [
    {
        text: 'Dashboard',
        link: '/cms/editor',
        icon: <BiChalkboard />,
        items: [],
    },
    {
        text: 'Bài viết',
        link: '/cms/editor/articles',
        icon: <BiFile />,
        items: [
            {
                text: 'Bài viết',
                link: '/cms/editor/articles',
                icon: null,
                items: [],
            },
            {
                text: 'Chủ đề bài viết',
                link: '/cms/editor/articles/topics',
                icon: null,
                items: [],
            },
        ],
    },
    {
        text: 'Apps',
        link: '/cms/editor/apps',
        icon: <BiFile />,
        items: [
            {
                text: 'Apps',
                link: '/cms/editor/apps',
                icon: null,
                items: [],
            },
            {
                text: 'App categories',
                link: '/cms/editor/apps/categories',
                icon: null,
                items: [],
            },
        ],
    },
    {
        text: 'Sản phẩm',
        link: '/cms/editor/products',
        icon: <BiBox />,
        items: [
            {
                text: 'Sản phẩm',
                link: '/cms/editor/products',
                icon: null,
                items: [],
            },
            {
                text: 'Danh mục sản phẩm',
                link: '/cms/editor/products/categories',
                icon: null,
                items: [],
            },
        ],
    },
    {
        text: 'Banner',
        link: '/cms/editor/banners',
        icon: <BiImage />,
        items: [],
    },
];

export const CMS_MENU: { [key: string]: IMenuItem[] } = {
    //   superadmin: SUPERADMIN_ITEMS,
    //   admin: ADMIN_ITEMS,
    editor: EDITOR_ITEMS,
};
