import React from 'react';
import {
  AiFillHome,
  AiFillPushpin,
  AiFillStar,
  AiOutlineMenu,
  AiOutlineUserSwitch,
} from 'react-icons/ai';
import { BiCategoryAlt, BiCommentDetail } from 'react-icons/bi';
import { BsMenuButtonWideFill } from 'react-icons/bs';
import { FaProductHunt, FaShippingFast } from 'react-icons/fa';
import { ImImages } from 'react-icons/im';
import { IoIosSettings } from 'react-icons/io';
import { MdCategory, MdHomeWork } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';
import { TbDiscountCheckFilled } from 'react-icons/tb';
//
import Logo from './Logo';
import Section from './Section';
import SidebarItem from './SidebarItem';

import useSelectFromGallery from '@src/hooks/useSelectFromGallery';

function Sidebar(): JSX.Element {
  const { selectFromGallery } = useSelectFromGallery();

  const handleOpenGallery = async () => {
    const files = await selectFromGallery(100, '*');
  };

  return (
    <div className="w-60 h-screen pr-0 flex flex-col group shrink-0">
      <Logo />
      <div className="flex-grow overflow-y-auto hidden-scrollbar hover:small-scrollbar py-6 px-5">
        <Section sectionName="quick link">
          <SidebarItem text="Dashboard" href="/" icon={<AiFillHome />} />
        </Section>
        <Section sectionName="Resources">
          <SidebarItem text="Home pages" href="/home" icon={<MdHomeWork />} />
          <SidebarItem text="users" href="/" icon={<AiOutlineUserSwitch />} />
          <button
            onClick={() => handleOpenGallery()}
            type="button"
            className="py-2 hover:bg-gray-100 px-4 rounded-md capitalize flex items-center gap-x-3 w-full"
          >
            <ImImages />
            Gallery
          </button>
        </Section>
        <Section sectionName="Shop">
          <SidebarItem
            text="products"
            href="/products"
            icon={<FaProductHunt />}
          />
          <SidebarItem
            text="collections"
            href="/collections"
            icon={<BiCategoryAlt />}
          />
          <SidebarItem text="orders" href="/orders" icon={<RiBillLine />} />
          <SidebarItem text="reviews" href="/" icon={<AiFillStar />} />
          <SidebarItem
            text="coupons"
            href="/coupons"
            icon={<TbDiscountCheckFilled />}
          />
          <SidebarItem
            text="shippings"
            href="/shippings"
            icon={<FaShippingFast />}
          />
        </Section>
        <Section sectionName="Blog">
          <SidebarItem text="posts" href="/" icon={<AiFillPushpin />} />
          <SidebarItem text="categories" href="/" icon={<MdCategory />} />
          <SidebarItem text="Comments" href="/" icon={<BiCommentDetail />} />
        </Section>
        <Section sectionName="settings">
          <SidebarItem text="general" href="/" icon={<IoIosSettings />} />
          <SidebarItem
            text="main menu"
            href="/menus"
            icon={<AiOutlineMenu />}
          />
          <SidebarItem text="footer" href="/" icon={<BsMenuButtonWideFill />} />
        </Section>
      </div>
    </div>
  );
}

export default React.memo(Sidebar);
