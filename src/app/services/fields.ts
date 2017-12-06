let fields = [];

fields['UNI_PORT'] = {
    "type": "form-text",
    "variable": "UNI_PORT",
    "label": "Port",
    "intrusiveness": "",
    "required": true,
    "regex_name": "any_number",
    "placeholder": "Port #",
    "values": [{ "value": "" }]
};

fields['UNI_PORT_20'] = {
    "type": "form-text",
    "variable": "UNI_PORT_20",
    "label": "Port",
    "intrusiveness": "",
    "required": true,
    "regex_name": "range_1_20",
    "placeholder": "Port #",
    "values": [{ "value": "" }]
};

fields['CUST_ID'] = {
    "type": "form-text",
    "variable": "CUST_ID",
    "label": "Customer ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Customer ID #",
    "values": [{ "value": "" }]
};

fields['CUST_NAME'] = {
    "type": "form-text",
    "variable": "CUST_NAME",
    "label": "Customer Name",
    "intrusiveness": "",
    "required": true,
    "regex_name": "customer_name_20",
    "placeholder": "Customer Name",
    "values": [{ "value": "" }]
},


    fields['TBS_ACCT'] = {
        "type": "form-text",
        "variable": "TBS_ACCT",
        "label": "TBS Account #",
        "intrusiveness": "",
        "required": true,
        "regex_name": "any_number",
        "placeholder": "TBS Account #",
        "values": [{ "value": "" }]
    },

    fields['PSR'] = {
        "type": "form_linked_text",
        "variable": "PSR",
        "label": "PSR #",
        "intrusiveness": "",
        "required": true,
        "isEnabled": true,
        "regex_name": "any_number",
        "placeholder": "PSR #",
        "dataPivotVariable": "CUST_ID",
        "dataParserName": "DP-ELN_PSR",
        "values": [{ "value": "" }]
    }

fields['PSR_UD'] = {
    "type": "form-text",
    "variable": "PSR_UD",
    "label": "PSR",
    "required": true,
    "regex_name": "any_number",
    "placeholder": "PSR # (numeric)",
    "values": [{ "value": "" }]
};

fields['SVC_UD'] = {
    "type": "form-text",
    "variable": "SVC_UD",
    "label": "Service ID",
    "required": true,
    "regex_name": "any_number",
    "placeholder": "Service ID (numeric)",
    "values": [{ "value": "" }]
};

fields['RING_VLAN'] = {
    "type": "form-text",
    "variable": "RING_VLAN",
    "label": "Ring VLAN",
    "required": true,
    "regex_name": "range_1000_2999",
    "placeholder": "Numbers 1000 to 2999",
    "values": [{ "value": "" }]
};

fields['RING_ID'] =
    {
        "type": "form-select",
        "label": "Ring ID",
        "variable": "RING_ID",
        "values": [{ "value": "" }],
        "required": true,
        "options": [
            { "label": "88", "value": "88" },
            { "label": "89", "value": "89" }
        ]
    };

fields['RING_ID_DV'] = {
    "type": "form_linked_text",
    "variable": "RING_ID_DV",
    "label": "Ring ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Ring ID #",
    "dataPivotVariable": "RING_VLAN",
    "dataParserName": "DP-ELN_RingID",
    "values": [{ "value": "" }]
};

fields['SVC_ACCESS_PTS'] = {
    "type": "form-combobox",
    "variable": "SVC_ACCESS_PTS",
    "label": "Service Access Points",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Any #",
    "dataCommand": "show service sap-using",
    "dataCommandRefreshFlag": "always",
    "registerWatcher": true,
    "dataParserName": "DP-ELN_SvcID",
    "values": [{ "value": "" }]
};

fields['AVLBL_SVC_ACCESS_PTS'] = {
    "type": "form-combobox",
    "variable": "AVLBL_SVC_ACCESS_PTS",
    "label": "Available Service Access Points",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Any #",
    "dataCommand": "show service sap-using",
    "dataCommandRefreshFlag": "always",
    "registerWatcher": true,
    "dataParserName": "DP-ELN_SvcID",
    "values": [{ "value": "" }]
};

fields['SVC_ID'] = {
    "type": "form_linked_text",
    "variable": "SVC_ID",
    "label": "Service ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Service ID #",
    "dataPivotVariable": "SVC_ACCESS_PTS",
    "dataParserName": "DP-ELN_CUSTO_ID",
    "values": [{ "value": "" }]
};

fields['SVCD_ID'] = {
    "type": "form_linked_text",
    "variable": "SVCD_ID",
    "label": "Service ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Service ID #",
    "dataPivotVariable": "AVLBL_SVC_ACCESS_PTS",
    "dataParserName": "DP-ELN_CUSTD_ID",
    "values": [{ "value": "" }]
};

fields['SRVC_ID'] = {
    "type": "form-text",
    "variable": "SRVC_ID",
    "label": "Service ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Service ID #",
    "values": [{ "value": "" }]
};

fields['CUSTO_ID'] = {
    "type": "form_linked_text",
    "variable": "CUSTO_ID",
    "label": "Customer ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Customer ID #",
    "dataPivotVariable": "SVC_ACCESS_PTS",
    "dataParserName": "DP-ELN_CUSTO_ID",
    "values": [{ "value": "" }]
};

fields['CUSTD_ID'] = {
    "type": "form_linked_text",
    "variable": "CUSTD_ID",
    "label": "Customer ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Customer ID #",
    "dataPivotVariable": "AVLBL_SVC_ACCESS_PTS",
    "dataParserName": "DP-ELN_CUSTD_ID",
    "values": [{ "value": "" }]
};

fields['CUSTR_ID'] = {
    "type": "form_linked_text",
    "variable": "CUSTR_ID",
    "label": "Customer ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Customer ID #",
    "dataPivotVariable": "SRVC_ID",
    "dataParserName": "DP-ELN_CUSTR_ID",
    "values": [{ "value": "" }]
};

fields['RING_VLAN_OF_SVCID'] = {
    "type": "form_linked_text",
    "variable": "RING_VLAN_OF_SVCID",
    "label": "Ring VLAN",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "PortID for SvcID",
    "dataPivotVariable": "SVC_ACCESS_PTS",
    "dataParserName": "DP-RING_VLAN_OF_SVCID",
    "values": [{ "value": "" }]
};

fields['RING_VLAN_OF_SVCD'] = {
    "type": "form_linked_text",
    "variable": "RING_VLAN_OF_SVCD",
    "label": "Ring VLAN",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "PortID for SvcID",
    "dataPivotVariable": "AVLBL_SVC_ACCESS_PTS",
    "dataParserName": "DP-RING_VLAN_OF_SVCD",
    "values": [{ "value": "" }]
};

fields['QOS_ID'] = {
    "type": "form-combobox",
    "variable": "QOS_ID",
    "label": "QOS ID",
    "intrusiveness": "",
    "required": false,
    "regex_name": "range_1000_1999",
    "placeholder": "1000-1999",
    "dataCommand": "show service sap-using",
    "dataParserName": "DP-QOS_OF_SVCID",
    "values": [{ "value": "" }]
};

fields['QOS_ID_SAPINGRESSS_1K'] = {
    "type": "form-combobox",
    "variable": "QOS_ID",
    "label": "QOS ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "range_1000_1999",
    "placeholder": "1000-1999",
    "dataCommand": "show qos sap-ingress",
    "dataParserName": "DP-QOS_OF_INGRESS",
    "values": [{ "value": "" }]
};

fields['CUST_QOS_ID'] = {
    "type": "form-combobox",
    "variable": "QOS_ID",
    "label": "Customer Specific UNI QoS ID",
    "intrusiveness": "",
    "required": false,
    "regex_name": "range_1000_1999",
    "placeholder": "1000-1999",
    "dataCommand": "show service sap-using",
    "dataParserName": "DP-QOS_OF_SVCID",
    "values": [{ "value": "" }]
};

fields['UNIPORT'] = {
    "type": "form-combobox",
    "variable": "UNIPORT",
    "label": "Port",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "UNIPORT",
    "dataCommand": "show service sap-using",
    "dataParserName": "DP-ELN_UNIPORT",
    "values": [{ "value": "" }]
};

fields['SRVC_ID'] = {
    "type": "form-text",
    "variable": "SRVC_ID",
    "label": "Service ID",
    "required": true,
    "regex_name": "any_number",
    "placeholder": "Any #",
    "values": [{ "value": "" }]
};

fields['SRVC_ID_CUST'] = {
    "type": "form_linked_text",
    "variable": "SRVC_ID_CUST",
    "label": "Service ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "any_number",
    "placeholder": "Any #",
    "dataPivotVariable": "CUST_ID",
    "dataParserName": "DP-ELN_SrvcID",
    "values": [{ "value": "" }]
};

fields['UNI_INTERFACE'] = {
    "type": "form-text",
    "variable": "INTERFACE",
    "label": "Interface",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Shelf/Slot/Port",
    "values": [{ "value": "" }]
}

fields['IPADDR_V4'] = {
    "type": "form-text",
    "variable": "IPADDR_V4",
    "label": "IP Address",
    "regex_name": "ip_v4",
    "required": false,
    "placeholder": "ex. 255.255.255.255",
    "values": [{ "value": "" }]
};

fields['MTU_9150'] = {
    "type": "form-text",
    "variable": "MTU_9150",
    "label": "MTU",
    "intrusiveness": "",
    "required": true,
    "regex_name": "range_0_9150",
    "placeholder": "MTU# 0 to 9150",
    "values": [{ "value": "" }]
};

fields['MTU_9212'] = {
    "type": "form-text",
    "variable": "MTU_9212",
    "label": "MTU",
    "intrusiveness": "",
    "required": true,
    "regex_name": "range_0_9212",
    "placeholder": "MTU# 0 to 9212",
    "values": [{ "value": "" }]
};

fields['MSPEED'] = {
    "type": "form-text",
    "variable": "MSPEED",
    "label": "Speed Mbps",
    "intrusiveness": "",
    "required": true,
    "regex_name": "digits_1to3",
    "placeholder": "Speed MBPS",
    "values": [{ "value": "" }]
};

fields['KSPEED'] = {
    "type": "form-text",
    "variable": "KSPEED",
    "label": "CIR Speed Kbps",
    "intrusiveness": "",
    "required": true,
    "regex_name": "trail2_0",
    "placeholder": "KBPS (check for atleast 2 trailing 0's)",
    "values": [{ "value": "" }]
};

fields['PIR_KSPEED'] = {
    "type": "form_linked_text",
    "variable": "PIR_KSPEED",
    "label": "PIR Speed Kbps",
    "intrusiveness": "",
    "required": true,
    "regex_name": "trail2_0",
    "placeholder": "KBPS (check for atleast 2 trailing 0's)",
    "dataPivotVariable": "KSPEED",
    "dataParserName": "DP-ELN_PIR",
    "values": [{ "value": "" }]
};

fields['QOS'] = {
    "type": "form-text",
    "variable": "QOS",
    "label": "QOS ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "digits_3or4",
    "placeholder": "3 or 4 digits",
    "values": [{ "value": "" }]
};

fields['QOS_noBorder'] = {
    "type": "form-combobox",
    "variable": "QOS_noBorder",
    "label": "QOS ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "QOS ID",
    "dataCommand": "show qos sap-ingress",
    "dataParserName": "DP-QOS_NoBorder",
    "values": [{ "value": "" }]
};

fields['CKT_ID'] = {
    "type": "form-text",
    "variable": "CKT_ID",
    "label": "Circuit ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "free_type",
    "placeholder": "Circuit ID",
    "values": [{ "value": "" }]
};

fields['CKT_ID_NSPACE'] = {
    "type": "form-text",
    "variable": "CKT_ID_NSPACE",
    "label": "Circuit ID",
    "intrusiveness": "",
    "required": true,
    "regex_name": "customer_name_20",
    "placeholder": "Circuit ID",
    "values": [{ "value": "" }]
};

fields['VLAN'] = {
    "type": "form-text",
    "variable": "VLAN",
    "label": "VLAN",
    "required": true,
    "regex_name": "range_1000_2999",
    "placeholder": "1000-2999",
    "values": [{ "value": "" }]
};

fields['UNIT'] =
    {
        "type": "form-select",
        "label": "Speed Type",
        "variable": "UNIT",
        "values": [{ "value": "" }],
        "required": true,
        "options": [
            { "label": "MB", "value": "MB" },
            { "label": "GB", "value": "GB" }
        ]
    };

export default fields;