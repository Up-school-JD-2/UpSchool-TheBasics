import {Container, Menu, Image, Icon, Button} from "semantic-ui-react";
import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AccountsContext, AppUserContext} from "../context/StateContext.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";

/*export type NavbarProps = {

}*/

const NavBar = () => {

    const { appUser, setAppUser } = useContext(AppUserContext);

    const { accounts } = useContext(AccountsContext);

    const navigate = useNavigate();

    const paginatedCountries = useSelector((state: RootState) => state.country.paginatedCountries);

    const handleLogout = () => {

        localStorage.removeItem("upstorage_user");

        setAppUser(undefined);

        navigate("/login");

    }

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/vite.svg' style={{ marginRight: '1.5em' }} />
                    UpStorage
                </Menu.Item>
                <Menu.Item as={NavLink} to="/">Home</Menu.Item>
                <Menu.Item as={NavLink} to="/accounts">Accounts ({accounts.length})</Menu.Item>
                <Menu.Item as={NavLink} to="/countries">Countries ({paginatedCountries && paginatedCountries.items.length})</Menu.Item>
                <Menu.Item as={NavLink} to="/dafasdqweasdaf">Not Found</Menu.Item>
                {!appUser && <Menu.Item as={NavLink} to="/login" position="right"><Icon name="sign-in" /> Login</Menu.Item>}
                {appUser && <Menu.Item as={Button} onClick={handleLogout} position="right"><Icon name="sign-out" /> Logout</Menu.Item>}
            </Container>
        </Menu>
    );
}

export default  NavBar;