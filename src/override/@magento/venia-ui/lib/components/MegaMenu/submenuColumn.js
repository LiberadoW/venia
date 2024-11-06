import React from 'react';
import { Link } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './submenuColumn.module.css';
import PropTypes from 'prop-types';

/**
 * The SubmenuColumn component displays columns with categories in submenu
 *
 * @param {MegaMenuCategory} props.category
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const SubmenuColumn = props => {
    const {
        category,
        categoryUrlSuffix,
        onNavigate,
        handleCloseSubMenu
    } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const categoryUrl = resourceUrl(
        `/${category.url_path}${categoryUrlSuffix || ''}`
    );

    const children = category.children || [];

    const renderChildren = (subCategories) => {
        return (
            <ul className={classes.submenuChild}>
                {subCategories.map((subCategory) => {
                    const { url_path, isActive, name, children } = subCategory;
                    const categoryUrl = resourceUrl(
                        `/${url_path}${categoryUrlSuffix || ''}`
                    );

                    const hasChildren = Array.isArray(children) && children.length > 0;
                    return (
                        <li key={subCategory.uid} className={classes.submenuChildItem}>
                            <Link
                                className={isActive ? classes.linkActive : classes.link}
                                data-cy="MegaMenu-SubmenuColumn-link"
                                to={categoryUrl}
                                onClick={onNavigate}
                            >
                                {name}
                            </Link>
                            {hasChildren && renderChildren(children)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className={classes.submenuColumn}>
            <Link
                className={classes.link}
                data-cy="MegaMenu-SubmenuColumn-link"
                to={categoryUrl}
                onClick={() => {
                    handleCloseSubMenu();
                    onNavigate();
                }}
            >
                <span className={classes.heading}>{category.name}</span>
            </Link>
            {children && children.length > 0 && renderChildren(children)}
        </div>
    );
};

export default SubmenuColumn;

SubmenuColumn.propTypes = {
    category: PropTypes.shape({
        children: PropTypes.array,
        uid: PropTypes.string.isRequired,
        include_in_menu: PropTypes.number,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        path: PropTypes.array.isRequired,
        position: PropTypes.number.isRequired,
        url_path: PropTypes.string.isRequired
    }).isRequired,
    categoryUrlSuffix: PropTypes.string,
    onNavigate: PropTypes.func.isRequired,
    handleCloseSubMenu: PropTypes.func.isRequired
}
