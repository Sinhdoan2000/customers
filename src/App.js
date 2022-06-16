import './index.css';
import { useState, useCallback, useRef} from 'react';
import '@shopify/polaris/build/esm/styles.css';
import {
  ActionList,ContextualSaveBar,FormLayout,Frame,Loading,Modal,Navigation,TextField,Toast,TopBar
} from "@shopify/polaris";
import { ArrowLeftMinor,HomeMajor,CustomersMajor,AppsMajor,AnalyticsMajor,TeamMajor,QuestionMarkInverseMajor} from "@shopify/polaris-icons";
import {
  Routes,
  Route
} from "react-router-dom";
import Customers from './Customers'
function App() {

  const defaultState = useRef({
    emailFieldValue: "Sinhdoan@globosoftware.net",
    nameFieldValue: "Sinh doan"
  });
  const skipToContentRef = useRef(null);

  const [toastActive, setToastActive] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [nav, setNav] = useState(() => {
    window.localStorage.setItem('tabs', '/');
    const currentTab = window.localStorage.getItem('tabs');
    return currentTab;
  })
  const handleChangeTabs = (tab)=>{  
    window.localStorage.setItem('tabs', tab);
    const currentTab = window.localStorage.getItem('tabs');
    setNav(currentTab);
}
  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue
  );
  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue
  );

  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue
  );
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  const handleSubjectChange = useCallback(
    (value) => setSupportSubject(value),
    []
  );
  const handleMessageChange = useCallback(
    (value) => setSupportMessage(value),
    []
  );
  const handleDiscard = useCallback(() => {
    setEmailFieldValue(defaultState.current.emailFieldValue);
    setNameFieldValue(defaultState.current.nameFieldValue);
    setIsDirty(false);
  }, []);
  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    defaultState.current.emailFieldValue = emailFieldValue;
    setIsDirty(false);
    setToastActive(true);
    setStoreName(defaultState.current.nameFieldValue);
  }, [emailFieldValue, nameFieldValue]);

  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue("");
  }, []);
  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  );
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );
  
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    []
  );

  const toastMarkup = toastActive ? <Toast onDismiss={toggleToastActive} content="Changes saved" /> : null;
  const userMenuActions = [
    {
      items: [{ content: "Community forums" }]
    }
  ];
  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave
      }}
      discardAction={{
        onAction: handleDiscard
      }}
    />
  ) : null;

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Sinh Globo"
      detail={storeName}
      initials="S"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" }
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search customers"
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );
  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: "Back to Shopify",
            icon: ArrowLeftMinor
          }
        ]}
      />
        <Navigation.Section
          separator
          items={[
            {
              url: "/",
              label: "Home",
              icon: HomeMajor,
              selected: nav == "/" ? true : false,
              onClick:() => handleChangeTabs('/')
            },
            {
              url: "/customers",
              label: "Customers",
              icon: CustomersMajor,
              selected: nav == "customer" ? true : false,
              onClick:() => handleChangeTabs('customer')
            },
            {
              url: "/Forms",
              label: "Forms",
              icon: AppsMajor,
              selected: nav == "Forms" ? true : false,
              onClick:() => handleChangeTabs('Forms')
            },
            {
              url: "/DataColumns",
              label: "Data columns",
              icon: AnalyticsMajor,
              selected: nav == "Data columns" ? true : false,
              onClick:() => handleChangeTabs('Data columns')
            },
            {
              url: "/Integrations",
              label: "Integrations",
              icon: TeamMajor,
              selected: nav == "Integrations" ? true : false,
              onClick:() => handleChangeTabs('Integrations')
            },
            {
              url: "/HelpAndSupport",
              label: "Help and support",
              icon: QuestionMarkInverseMajor,
              selected: nav == "Help and support" ? true : false,
              onClick:() => handleChangeTabs('Help and support')
            }
          ]}
        />
    </Navigation>
  );

  const loadingMarkup = <Loading /> ;
 
  const actualPageMarkup = (
      <Routes>
        <Route path="/Customers" element={<Customers />}></Route>
      </Routes>
  );

  const pageMarkup = actualPageMarkup;

  const modalMarkup = (
    <Modal
      open={modalActive}
      onClose={toggleModalActive}
      title="Contact support"
      primaryAction={{
        content: "Send",
        onAction: toggleModalActive
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Subject"
            value={supportSubject}
            onChange={handleSubjectChange}
            autoComplete="off"
          />
          <TextField
            label="Message"
            value={supportMessage}
            onChange={handleMessageChange}
            autoComplete="off"
            multiline
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
  
  return (
    <div style={{ height: "500px" }}>
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
        skipToContentTarget={skipToContentRef.current}
      >
        {contextualSaveBarMarkup}
        {loadingMarkup}
        {pageMarkup}       
        {toastMarkup}
        {modalMarkup}
      </Frame>
    </div>
  );
}

export default App;