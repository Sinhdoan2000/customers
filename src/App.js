import './index.css';
import { useState, useEffect, useCallback, useRef} from 'react';
import '@shopify/polaris/build/esm/styles.css';
import {
  ActionList,AppProvider,Card,ContextualSaveBar,FormLayout,Frame,Layout,Loading,Modal,Navigation,Page,SkeletonBodyText
  ,SkeletonDisplayText,SkeletonPage,TextContainer,TextField,Toast,TopBar
} from "@shopify/polaris";
import { ArrowLeftMinor,ConversationMinor,HomeMajor,CustomersMajor,AppsMajor,AnalyticsMajor,TeamMajor,QuestionMarkInverseMajor} from "@shopify/polaris-icons";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Customers from './Customers'
function App() {

  const defaultState = useRef({
    emailFieldValue: "Sinhdoan@globosoftware.net",
    nameFieldValue: "Sinh doan"
  });
  const skipToContentRef = useRef(null);

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
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
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    []
  );
  
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    []
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

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
            url: "/Home",
            label: "Home",
            icon: HomeMajor,
            onClick: toggleIsLoading
          },
          {
            url: "/customers",
            label: "Customers",
            path: "/customers",
            icon: CustomersMajor,
            selected: true,
            onClick: toggleIsLoading
          },
          {
            url: "/forms",
            label: "Forms",
            icon: AppsMajor,
            onClick: toggleIsLoading
          },
          {
            url: "/dataColumns",
            label: "Data columns",
            icon: AnalyticsMajor,
            onClick: toggleIsLoading
          },
          {
            url: "/Integration",
            label: "Integrations",
            icon: TeamMajor,
            onClick: toggleIsLoading
          },
          {
            url: "/helpAndSupport",
            label: "Help and support",
            icon: QuestionMarkInverseMajor,
            onClick: toggleIsLoading
          }
        ]}
        action={{
          icon: ConversationMinor,
          accessibilityLabel: "Contact support",
          onClick: toggleModalActive
        }}
      />
    </Navigation>
  );

  const loadingMarkup = isLoading ? <Loading /> : null;
 
  const actualPageMarkup = (
    <BrowserRouter>
      <Routes>
        <Route path="/customers" element={<Customers />}></Route>
      </Routes>
    </BrowserRouter>
  );

  const loadingPageMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

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
    <AppProvider
      i18n={{
        Polaris: {
          Avatar: {
            label: "Avatar",
            labelWithInitials: "Avatar with initials {initials}"
          },
          ContextualSaveBar: {
            save: "Save",
            discard: "Discard"
          },
          TextField: {
            characterCount: "{count} characters"
          },
          TopBar: {
            toggleMenuLabel: "Toggle menu",

            SearchField: {
              clearButtonLabel: "Clear",
              search: "Search"
            }
          },
          Modal: {
            iFrameTitle: "body markup"
          },
          Frame: {
            skipToContent: "Skip to content",
            navigationLabel: "Navigation",
            Navigation: {
              closeMobileNavigationLabel: "Close navigation"
            }
          }
        }
      }}
    >
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
    </AppProvider>
  </div>
  );
}

export default App;