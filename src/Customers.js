import React,{ useState, useEffect, useCallback} from 'react';
import '@shopify/polaris/build/esm/styles.css';
import {Page, Card, IndexTable, TextStyle, useIndexResourceState, Select, Button, Modal, 
TextContainer, Badge, Form, FormLayout, TextField, EmptySearchResult, ChoiceList, Filters, Grid, OptionList, Icon} from '@shopify/polaris';
import { CustomersMajor,EmailMajor, FormsMajor, CalendarMinor, HashtagMajor, TabletMajor, GrammarMajor, CodeMajor, SortMinor} from "@shopify/polaris-icons";
import { useFormik } from "formik";
import * as Yup from "yup"; 
import './index.css'

    let SignupSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
        lastName: Yup.string()
          .min(2, "Too short!")
          .max(50, "Too long!")
          .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        phone: Yup.number().min(100000000, 'Invalid phone number').max(10000000000, 'Invalid phone number').required()
    });
function Customers(){

    const customers = [
        {
          id: '3411',
          url: 'customers/3411',
          firstName: <Button plain>Mae</Button>,
          email: <Button plain>Sinhdoan2000@globosoftware.net</Button>,
          accountStatus: <Badge status="success">Account active</Badge>,
          phone: <Button plain>+846156702</Button>,
          createAt: 'Septemper 17, 2021 09:41 AM+07 (8 months ago)',
          lastUpdateAt: "",
          note: "",
          tags: "",
          acceptsMarketing: "",
          numberOfOrders: "0 orders",
          shopifyCustomerid: "",
          lastName:  <Button plain>Jemison</Button>
        },
        {
          id: '2561',
          url: 'customers/2561',
          firstName: <Button plain>Ellen</Button>,
          email: <Button plain>Sinhdoan2000@globosoftware.net</Button>,
          accountStatus: <Badge status="success">Account active</Badge>,
          phone: <Button plain>+846156702</Button>,
          createAt: 'October 14, 2022 19:41 PM+07 (2 years ago)',
          lastUpdateAt: "",
          note: "",
          tags: "",
          acceptsMarketing: "",
          numberOfOrders: "0 orders",
          shopifyCustomerid: "",
          lastName: <Button plain>Ochoa</Button>
        },
    ];

    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const headings = [
      {title: 'Create at', id: 4},
      {title: 'Phone', id: 4},
      {title: 'Account status', id: 3},
      {title: 'Email', id: 2},
      {title: 'First name', id: 0},
    ]

    const LabelConfigureOption = (props)=>{
      let urlSource = props.source;
      let title = props.title;
      return <div style={{display: "flex"}}><Icon source={urlSource} color="base" /> <span style={{margin: "0 10px"}}>{title}</span></div>
    }

    const optionConfigModal = [
      {value: 'First name', label: <LabelConfigureOption source={CustomersMajor} title="First name (first_name)"/> },
      {value: 'Last name', label:  <LabelConfigureOption source={CustomersMajor} title="Last name (last_name)" />},
      {value: 'Email', label: <LabelConfigureOption source={EmailMajor} title="Email (email)" />},
      {value: 'Account status', label: <LabelConfigureOption source={FormsMajor} title="Account status (state)" />},
      {value: 'Last update at', label: <LabelConfigureOption source={CalendarMinor} title="Last updated at (update_at)" />},
      {value: 'Shopify customer id', label: <LabelConfigureOption source={HashtagMajor} title="Shopify customer id (shopify_id)" />},
      {value: 'Phone', label: <LabelConfigureOption source={TabletMajor} title="Phone (phone)" />},
      {value: 'Create at', label: <LabelConfigureOption source={CalendarMinor} title="Created at (create_at)" />},
      {value: 'Note', label: <LabelConfigureOption source={FormsMajor} title="Note (note)" />},
      {value: 'Tags', label: <LabelConfigureOption source={GrammarMajor} title="Tags (tags)" />},
      {value: 'Accepts marketing', label: <LabelConfigureOption source={CodeMajor} title="Accepts marketing (accepts_marketing)" />},
      {value: 'Number of orders', label: <LabelConfigureOption source={HashtagMajor} title="Number of orders (orders_count)" />},
    ]
    const [dataCustomers, setDataCustomers] = useState(customers);
    const [queryValue, setQueryValue] = useState("");
    const appliedFilters = [];
    const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(dataCustomers);
    const [selectedSort, setSelectedSort] = useState(['lastUpdate']);
    const [selectedSortText, setSelectedSortText] = useState(['A - Z']);

    const [headerTable, setHeadingTable] = useState(headings.sort((a, b)=>{
      return a.id < b.id ? 1 : -1;
    }));

    const [optionConfig, setOptionConfig] = useState(optionConfigModal);
    const [dataHeadings, setDataHeading] = useState(headings);
    const handleSortChange =(value) => {
      setSelectedSort(value)
    };

      //handle sort data
    const sortAZ = (a, b)=>{
      return a.firstName.props.children > b.firstName.props.children ? 1 : -1;
    }
    const sortZA = (a, b) =>{
      return a.firstName.props.children > b.firstName.props.children ? -1 : 1;
    }
    const handleSoft = ()=>{
      if(selectedSortText == 'A - Z'){
        dataCustomers.sort(sortAZ);
        setDataCustomers(dataCustomers);
      }else if(selectedSortText == 'Z - A'){
        dataCustomers.sort(sortZA);
        setDataCustomers(dataCustomers);
      }
    }
    const handleSortChangeText = (value) => {
      setSelectedSortText(value);
      handleSoft()
    };
    const emptyStateMarkup = (
        <EmptySearchResult
          title={'No customers yet'}
          description={'Try changing the filters or search term'}
          withIllustration
        />
    );
   
    //thay đổi tên key object và thêm key id cho object
    const test = dataHeadings.reverse();
    const dataConfigRender = {};
    test.forEach((item)=>{
      let myStr = item.title.split(" ");
      for(var i = 0; i< myStr.length; i++){
        if(i != 0){
          myStr[i] = myStr[i][0].toUpperCase() + myStr[i].slice(1);
        }else{
          myStr[i] = myStr[i][0].toLowerCase() + myStr[i].slice(1);
        }
      }
      let newStr = myStr.join('');    
      dataConfigRender[newStr] = {
        title: item.title,
        id: item.id
      };
    })

    const rowMarkup = dataCustomers.map(
        ({id, firstName, email, accountStatus, phone, createAt, lastUpdateAt, note, tags, acceptsMarketing, numberOfOrders, lastName}, index) => (
        <IndexTable.Row
            id={id}
            key={id + createAt + firstName + lastName}
            selected={selectedResources.includes(id)}
            position={index}
        >
          {dataConfigRender.firstName ?  <IndexTable.Cell title="First name"><TextStyle>{firstName}</TextStyle> </IndexTable.Cell> : '' }
          {dataConfigRender.lastName ?  <IndexTable.Cell title="Shopify customer id">{lastName}</IndexTable.Cell> : ''}
          {dataConfigRender.email ? <IndexTable.Cell title="Email">{email}</IndexTable.Cell> : ''}
          {dataConfigRender.accountStatus ? <IndexTable.Cell title="Account status">{accountStatus}</IndexTable.Cell> : ''}
          {dataConfigRender.phone ? <IndexTable.Cell title="Phone">{phone}</IndexTable.Cell> : ''}
          {dataConfigRender.createAt ? <IndexTable.Cell title="Create at">{createAt}</IndexTable.Cell> : ''}
          {dataConfigRender.lastUpdateAt ? <IndexTable.Cell title="Last update at">{lastUpdateAt}</IndexTable.Cell> : ''}
          {dataConfigRender.note ?  <IndexTable.Cell title="Note">{note}</IndexTable.Cell> : ''}
          {dataConfigRender.tags ?   <IndexTable.Cell title="Tags">{tags}</IndexTable.Cell> : ''}
          {dataConfigRender.acceptsMarketing ?  <IndexTable.Cell title="Accepts marketing">{acceptsMarketing}</IndexTable.Cell> : ''}
          {dataConfigRender.numberOfOrders ?  <IndexTable.Cell title="Number of orders">{numberOfOrders}</IndexTable.Cell> : ''}
          {dataConfigRender.shopifyCustomerId ?  <IndexTable.Cell title="Shopify customer id">{id}</IndexTable.Cell> : ''}        
        </IndexTable.Row>         
        ),
    );
    
    //hành động xoá
    const bulkActions = [
        {
            content: 'Delete customers',
            onAction: () => setActive(true)
        },
    ];

    const [active, setActive] = useState(false);
    const [activeModalAdd, setActiveModalAdd] = useState(false);
    const handleChange = useCallback(() => setActive(!active), [active]);
    const handleDeleteTable = ()=>{
      const newData = dataCustomers.filter(function(customer){
          return !selectedResources.includes(customer.id)
      })
      if(newData){
        setDataCustomers(newData);
      }else{
          setDataCustomers([])
      }
        setActive(false);
    }

    const modalDelete = (  
            <Modal
              open={active}
              onClose={handleChange}
              title={selectedResources.length <= 1 ? "Delete " + selectedResources.length + " customer ?" : "Delete " + selectedResources.length + " customers ?"}
              primaryAction={{
                content: 'Delete',
                destructive: true,
                onAction: handleDeleteTable,
              }}
              secondaryActions={[
                {
                  content: 'Cancel',
                  onAction: handleChange,
                },
              ]}
            >
              <Modal.Section>
                <TextContainer>
                  <p>Are you sure you want to delete this customer ?</p>
                </TextContainer>
              </Modal.Section>
            </Modal>      
    )

    const [isOpenConfigure, setOpenConfigure] = useState(false);
    const handleCloseConfigure = ()=> setOpenConfigure(false);
    const [selectedConfigure, setSelectedConfigure] = useState(['First name', 'Email', 'Account status', 'Phone', 'Create at']);
    const [ConfigurequeryValue, setConfigurequeryValue] = useState("");

      //when checkbox config re-render
    useEffect(()=>{
          const newHeadings = [];
          selectedConfigure.forEach(item=>{
            let option = {title: item}
            newHeadings.unshift(option)
          })
          setDataHeading(newHeadings);
    }, [selectedConfigure])

      //sắp xếp lại bảng
    const handleRenderHeadingTable = (dataConfigRender)=>{
      // nếu như không chọn config nào thì sẽ trả về mặc định
      if(selectedConfigure.length == 0){
        setSelectedConfigure(['First name', 'Email', 'Account status', 'Phone', 'Create at'])  
        setHeadingTable(headings)
      }else{
          // gán id cho phần tử để sắp xếp bảng
          if(dataConfigRender.firstName){ dataConfigRender.firstName.id = 0}
          if(dataConfigRender.lastName){dataConfigRender.lastName.id = 1}
          if(dataConfigRender.email){  dataConfigRender.email.id = 2}
          if(dataConfigRender.accountStatus){ dataConfigRender.accountStatus.id =  3}
          if(dataConfigRender.phone){ dataConfigRender.phone.id =  4}
          if(dataConfigRender.createAt){ dataConfigRender.createAt.id =  5}
          if(dataConfigRender.lastUpdateAt){ dataConfigRender.lastUpdateAt.id =  6}
          if(dataConfigRender.note){ dataConfigRender.note.id =  7}
          if(dataConfigRender.tags){ dataConfigRender.tags.id =  8}
          if(dataConfigRender.acceptsMarketing){ dataConfigRender.acceptsMarketing.id = 9}
          if(dataConfigRender.numberOfOrders){ dataConfigRender.numberOfOrders.id =  10}
          if(dataConfigRender.shopifyCustomerId){dataConfigRender.shopifyCustomerId.id = 11}

        //convert from object to array
        const newArr = []
        for(let key in dataConfigRender){
          newArr.push(dataConfigRender[key])
        }
        setHeadingTable(newArr);
    }
      setOpenConfigure(false);
    }

    const handleDoneConfigure = ()=>{
      handleRenderHeadingTable(dataConfigRender)  
    }

    const handleFilterConfig = (data, value)=>{
      const resultData = data.filter(function(item){
        return item.value.toLowerCase().search(value.toLowerCase()) != -1;
      })
      return resultData.length > 0 ? resultData : [];
    }

    const handleConfigureQueryValueChange =(value) => {
        setConfigurequeryValue(value);
        const resultData = handleFilterConfig(optionConfig, value);         
        if(!value){
          setOptionConfig(optionConfigModal)
        }else{      
          setOptionConfig(resultData); 
        }     
      }

    const handleConfigureQueryValueRemove = () => {    
      setConfigurequeryValue("")
      setOptionConfig(optionConfigModal);
    };
  
    const handleClearAll = useCallback(() => {
      handleQueryValueRemove();
    }, [handleConfigureQueryValueRemove]);

    const modalConfigure = (
          <Modal
              open={isOpenConfigure}
              onClose={handleCloseConfigure}
              title= "Configure data columns"
              primaryAction={{
                content: 'Done',
                primary: true,
                onAction: handleDoneConfigure,
              }}
              secondaryActions={[
                {
                  content: 'Cancel',
                  onAction: handleCloseConfigure,
                },
              ]}
            >
              <div className='modalConfig'>
                <Modal.Section>
                  <div style={{padding: "10px 15px"}}>
                    <Filters
                      queryValue={ConfigurequeryValue}
                      filters={[]}
                      onQueryChange={handleConfigureQueryValueChange}
                      onQueryClear={handleConfigureQueryValueRemove}
                      onClearAll={handleClearAll}
                    />
                  </div>
                    <OptionList
                      onChange={setSelectedConfigure}
                      options={optionConfig}
                      selected={selectedConfigure}
                      allowMultiple
                    />
                </Modal.Section>
              </div>
          </Modal>      
    )

    //trả về lịch thời gian hiện tại sau khi thêm 1 customer
    const handleGetCurrentTime = ()=>{
        const date = new Date();
                var current_month = date.getMonth();
                var month_name = '';
                switch (current_month) {
                case 1:
                    month_name = "January";
                    break;
                case 2:
                    month_name = "February";
                    break;
                case 3:
                    month_name = "March";
                    break;
                case 4:
                    month_name = "April";
                    break;
                case 5:
                    month_name = "May";
                    break;
                case 5:
                    month_name = "June";
                    break;
                case 6:
                    month_name = "July";
                case 7:
                    month_name = "Saturday";
                case 8:
                    month_name = "August";
                case 9:
                    month_name = "Septembe";
                case 10:
                    month_name = "October";
                case 11:
                    month_name = "November";
                }
                const currentTime = date.getHours() > 12 ? "PM" : "AM";
                const currentMinutes = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
                const currentGMT = date.getUTCHours() >= 10 ? date.getUTCHours() : "0" + date.getUTCHours();
        const currentCalendar = month_name + ' ' + date.getDate() + ', ' + date.getFullYear() + ', ' + date.getHours() + ":" + currentMinutes + " " + currentTime + " +" + currentGMT;
        return currentCalendar;
    }
    
    //xử lý khi form được submit
    const formik = useFormik({
        initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
        note: ""
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            const jsonData = JSON.stringify(values);
            const data = JSON.parse(jsonData);
            if(data){
                const id = dataCustomers[dataCustomers.length - 1] ? Number(dataCustomers[dataCustomers.length - 1].id) + 1 : '0';
                const status = selected == "Account active" ?  <Badge status="success">{selected}</Badge> : selected != "Invitation sent" ? <Badge>{selected}</Badge> : <Badge status="info">{selected}</Badge>;
                const newData = {
                    id: id.toString(),
                    url: 'customers/' + id,
                    firstName: <Button plain>{data.firstName}</Button>,
                    email: <Button plain>{data.email}</Button>,
                    accountStatus: status,
                    phone: <Button plain>{data.phone}</Button>,
                    createAt: handleGetCurrentTime(),
                    note: data.note,
                    lastName: <Button plain>{data.lastName}</Button>,
                    numberOfOrders: '0 orders'
                }
                if(newData){               
                    dataCustomers.push(newData);
                    setActiveModalAdd(false);
                    handleSoft();
                }
            }
        }
    });

    const handleChangeRequired = (value, id) => {
        formik.setFieldValue(id, value);
    };

    const { values, errors, touched } = formik;

    const [selected, setSelected] = useState('Account active');

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const options = [
        {label: 'Account active', value: 'Account active'},
        {label: 'Account not active', value: 'Account not active'},
        {label: 'Invitation sent', value: 'Invitation sent'}
      ];
    
    //modal thêm khách hàng
    const modalAddCustomer = (
            <Modal
              large
              open={activeModalAdd}
              onClose={() => setActiveModalAdd(false)}
              title="Add new customer"
              primaryAction={{
                content: 'Add',
                primary: true,
                submit: true,
                onAction: formik.handleSubmit,
              }}
              secondaryActions={[
                {
                  content: 'Cancel',
                  onAction: () => setActiveModalAdd(false),
                },
              ]}
            >
              <Modal.Section>
                <TextContainer>
                  <Form onSubmit={formik.handleSubmit}>
                    <FormLayout>  
                      <Grid>
                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 9, xl: 9}}>
                          <TextField
                            value={values.firstName}
                            onChange={handleChangeRequired}
                            label="First name"
                            type="text"
                            id="firstName"
                            error={touched.firstName && errors.firstName}
                          />
                          <TextField
                            value={values.lastName}
                            onChange={handleChangeRequired}
                            label="Last name"
                            type="text"
                            id="lastName"
                            error={touched.lastName && errors.lastName}
                          />
                          <TextField
                            value={values.email}
                            onChange={handleChangeRequired}
                            label="Email"
                            type="email"
                            autoComplete="email"
                            id="email"
                            error={touched.email && errors.email}
                          />  
                          <TextField
                            label="Notes"
                            type="text"
                            id="note"
                            value={values.note}
                            onChange={handleChangeRequired}
                            error={touched.note && errors.note}
                            multiline={4}
                          />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                          <Select
                            label="Account status"
                            options={options}
                            onChange={handleSelectChange}
                            value={selected}
                          />   
                          <TextField
                            label="Phone number"
                            type="number"
                            id="phone"
                            value={values.phone}
                            onChange={handleChangeRequired}
                            error={touched.phone && errors.phone}
                          />  
                        </Grid.Cell>
                      </Grid>                    
                    </FormLayout>
                  </Form>
                </TextContainer>
              </Modal.Section>
            </Modal>      
    )

    //mở modal thêm khách hàng và reset lại giá trị các feilds
    const handleOpenModalAddCustomer = () =>{
        setActiveModalAdd(true);
        //reset values fields
        values.firstName = "";
        values.email = "";
        values.phone = 0;
        values.note = "";
        values.lastName = "";
        setSelected('Account active');
    }

    const handleFiltersQueryChange = useCallback(function (value){
        setQueryValue(value);
        const resultFilter = handleFilterTable(dataCustomers, value);
          setDataCustomers(resultFilter)
    },[]);

    //Event search customer
    const handleFilterTable  = (data, value)=>{
      const resultData = data.filter(function(item){
        return item.firstName.props.children.toLowerCase().search(value.toLowerCase()) != -1;
      })
      return resultData.length > 0 ? resultData : [];
    }

    //Event Remove data value search input
    const handleQueryValueRemove = useCallback(function() {
      setQueryValue("");
    }, []);

    const handleFiltersClearAll = useCallback(() => {
      handleQueryValueRemove();
    }, [
      handleQueryValueRemove,
    ]);
    
    const filters = [
      {
        key: 'sort',
        label: <div style={{display: "flex", alignItems: "center"}}><Icon  source={SortMinor} color="base" /> Sort</div>,
        filter: (
            <div>
              <ChoiceList
                title="Sort by"
                choices={[
                  {label: 'Last update', value: 'lastUpdate'},
                  {label: 'Amount spent', value: 'amountSpent'},
                  {label: 'Total orders', value: 'totalOrders'},
                  {label: 'Last order date', value: 'lastOrderDate'},
                  {label: 'First order date', value: 'firstOrderDate'},
                  {label: 'Date added as customer', value: 'dateAddedAsCustomer'},
                  {label: 'Last abandoned order date', value: 'lastAbandonedOrderDate'},
                ]}
                selected={selectedSort}
                onChange={handleSortChange}
              /> 
              <div style={{height: "1px", width: "100%", background: "#dfd9d9", margin: "10px 0"}}></div>
              <ChoiceList
                choices={[
                  {label: 'A - Z', value: 'A - Z'},
                  {label: 'Z - A', value: 'Z - A'},
                ]}               
                selected={selectedSortText}
                onChange={handleSortChangeText}
              /> 
            </div>        
        ),
        shortcut: true,
      }
    ];
  
  return (
    <Page 
      fullWidth 
      primaryAction={{content: 'Add customer', disabled: false,  primary: true, onClick: handleOpenModalAddCustomer}}
      title="Customers"
    >
        <Card>
            <div className="Polaris-Card__Header" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <TextStyle variation="subdued">{"Showing " + dataCustomers.length + " of " + dataCustomers.length + " customers."}</TextStyle>
              <div className="Polaris-right-content">
                <TextStyle variation="subdued">
                  Showing {headerTable.length} of {optionConfigModal.length} columns
                  <span style={{marginLeft: "5px"}}>
                    <Button onClick={() => setOpenConfigure(true)}> {headerTable.length} </Button>
                  </span>
                </TextStyle>
              </div>
            </div>
            <Card.Section>        
              <Filters
                queryValue={queryValue}
                filters={filters}
                appliedFilters={appliedFilters}
                onQueryChange={handleFiltersQueryChange}
                onQueryClear={handleQueryValueRemove}
                onClearAll={handleFiltersClearAll}
                queryPlaceholder="Search customers"
                showHeader
              />
            </Card.Section>
            <IndexTable             
              totalItemsCount={dataCustomers.length}
              resourceName={resourceName}
              itemCount={dataCustomers.length}
              selectedItemsCount={ allResourcesSelected ? 'All' : selectedResources.length }
              onSelectionChange={handleSelectionChange}
              bulkActions={bulkActions}
              emptyState={emptyStateMarkup}
              headings={headerTable.sort((a, b)=>{
                return a.id < b.id ? -1 : 1;
              })}             
            >
              {rowMarkup ? rowMarkup : ''}
              {modalDelete}
            </IndexTable>
              {modalAddCustomer}
              {modalConfigure}
        </Card>
    </Page>
    )
}

export default Customers;