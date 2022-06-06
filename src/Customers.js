import { useState, useEffect, useCallback} from 'react';
import '@shopify/polaris/build/esm/styles.css';
import {Page, Card, IndexTable, TextStyle, useIndexResourceState, Select, Icon, Button, Modal, 
TextContainer, Badge, Form, FormLayout, TextField, EmptySearchResult} from '@shopify/polaris';
import { useFormik } from "formik";
import * as Yup from "yup";
import './index.css'

    let SignupSchema = Yup.object().shape({
        firstName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        phone: Yup.number().min(100000000, 'Invalid phone number').max(10000000000, 'Invalid phone number').required(),
    });

function Customers(){
    const customers = [
        {
        id: '3411',
        url: 'customers/341',
        firstName: <Button plain>Mae Jemison</Button>,
        email: <Button plain>Sinhdoan2000@globosoftware.net</Button>,
        accountStatus: <Badge status="success">Account active</Badge>,
        phone: <Button plain>+84615702</Button>,
        createAt: 'Septemper 17, 2021 09:41 AM+07 (8 months ago)'
        },
        {
        id: '2561',
        url: 'customers/256',
        firstName: <Button plain>Ellen Ochoa</Button>,
        email: <Button plain>Sinhdoan2000@globosoftware.net</Button>,
        accountStatus: <Badge status="success">Account active</Badge>,
        phone: <Button plain>+84615702</Button>,
        createAt: 'October 14, 2022 19:41 PM+07 (2 years ago)'
        },
    ];
    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };
    const [dataCustomers, setDataCustomers] = useState(customers);
    const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(dataCustomers);
    const emptyStateMarkup = (
        <EmptySearchResult
          title={'No customers yet'}
          description={'Try changing the filters or search term'}
          withIllustration
        />
      );
    const rowMarkup = dataCustomers.map(
        ({id, firstName, email, accountStatus, phone, createAt}, index) => (
        <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
        >
            <IndexTable.Cell>
            <TextStyle>{firstName}</TextStyle>
            </IndexTable.Cell>
            <IndexTable.Cell>{email}</IndexTable.Cell>
            <IndexTable.Cell>{accountStatus}</IndexTable.Cell>
            <IndexTable.Cell>{phone}</IndexTable.Cell>
            <IndexTable.Cell>{createAt}</IndexTable.Cell>
        </IndexTable.Row>
        ),
    );

    const [selectedColumn, setSelectedColumn] = useState('5');
    const handleSelectChangeColumn = useCallback((value) => setSelectedColumn(value), []);
    const optionsColumns = [
        {label: "5" , value: "5"},
        {label: "2" , value: "2"},
        {label: "1" , value: "1"},
    ];

    const bulkActions = [
        {
            content: 'Delete customers',
            onAction: () => setActive(true),
        },
    ];

    const promotedBulkActions = [
        {
        content: 'Edit customers',
        onAction: () => console.log('Todo: implement bulk edit'),
        },
    ];

    const [active, setActive] = useState(false);
    const [activeModalAdd, setActiveModalAdd] = useState(false);
    const handleChange = useCallback(() => setActive(!active), [active]);

    const handleDeleteTable = ()=>{
        console.log(selectedResources, allResourcesSelected);
        const newData = dataCustomers.filter(function(customer){
            return !selectedResources.includes(customer.id)
        })
        if(newData){
            setDataCustomers(newData)
        }else{
            setDataCustomers([])
        }
        setActive(false);
    }
    const modalDelete = (  
            <Modal
              open={active}
              onClose={handleChange}
              title={selectedResources.length <= 1 ? "Remove " + selectedResources.length + " customer ?" : "Remove " + selectedResources.length + " customers ?"}
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
                  <p>This can’t be undone.</p>
                </TextContainer>
              </Modal.Section>
            </Modal>      
      )

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
        const currentCalender = month_name + ' ' + date.getDate() + ', ' + date.getFullYear() + ', ' + date.getHours() + ":" + currentMinutes + " " + currentTime + " +07";
        return currentCalender;
    }

    const formik = useFormik({
        initialValues: {
        firstName: "",
        email: "",
        phone: 0
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
                        createAt: handleGetCurrentTime()
                    }
                if(newData){                 
                    dataCustomers.push(newData);
                    setActiveModalAdd(false);
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
                        <TextField
                            value={values.firstName}
                            onChange={handleChangeRequired}
                            label="First name"
                            type="text"
                            id="firstName"
                            error={touched.firstName && errors.firstName}
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
                    </FormLayout>
                </Form>
                </TextContainer>
              </Modal.Section>
            </Modal>      
    )

    useEffect(()=>{
        setDataCustomers(dataCustomers)
    }, [dataCustomers.length])
    
    const handleOpenModalAddCustomer = () =>{
        setActiveModalAdd(true);

        //reset value field
        values.firstName = "";
        values.email = "";
        values.phone = 0
    }

  return (
    <Page 
      fullWidth 
      primaryAction={{content: 'Add customer', disabled: false,  primary: true, onClick: handleOpenModalAddCustomer}}
      title="Customers">
        <Card>
            <div className="Polaris-Card__Header" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <TextStyle variation="subdued">{"Showing " + dataCustomers.length + " of " + dataCustomers.length + " customers."}</TextStyle>
              <div className="Polaris-right-content">
                <TextStyle variation="subdued">
                  Showing 5 of 20 columns
                  <Select
                    options={optionsColumns}
                    onChange={handleSelectChangeColumn}
                    value={selectedColumn}
                  />
                </TextStyle>
              </div>
            </div>
            <IndexTable
              resourceName={resourceName}
              itemCount={dataCustomers.length}
              selectedItemsCount={ allResourcesSelected ? 'All' : selectedResources.length }
              onSelectionChange={handleSelectionChange}
              bulkActions={bulkActions}
              promotedBulkActions={promotedBulkActions}
              emptyState={emptyStateMarkup}
              headings={[
                {title: 'First name'},
                {title: 'Email'},
                {title: 'Account status'},
                {title: 'Phone'},
                {title: 'Create at'},
              ]}
            >
              {rowMarkup ? rowMarkup : ''}
              {modalDelete}
            </IndexTable>
            {modalAddCustomer}
        </Card>
    </Page>
    )
}


export default Customers;