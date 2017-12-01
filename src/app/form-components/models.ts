import { PatternValidator } from "@angular/forms/src/directives/validators";

export interface Variable{
    type:string;
    name:string;
    label:string;
    regex_name?:string;
    required:boolean;
    placeholder:string;
    value:string,
    pattern?:RegExp;
    dataCommandRefreshFlag?:string;
    dataCommand?:string;
    dataParserName?:string;
    values:Array<{value:string}>;
    variable:string;    
    dataPivotVariable?:string;
    allow_blocked?:boolean;
    options?:Array<{label:string, value:string}>;
    checked?:string;
    unchecked?:string;
}

export interface Command{
    intrusiveness:string;
    name:string;
    snippets:Array<{text:string}>;
    variables:Array<Variable>;
    category:string;
    resource_hog:boolean;
    device?:string;
    approved?:boolean
    access:any;
}

export const regexList = [
    { name: "free_type_or_null", pattern: /^(.*\S.*|\z)$/},
    { name: "free_type", pattern: /^.*\S.*$/ },
    { name: "free_type_32", pattern: /^[.*\S.*]+$/ },
    { name: "any_number", pattern: /^[-+]?\d*$/ },
    { name: "any_positive_number", pattern: /^\d+$/ },
    { name: "numeric_8", pattern: /^[0-9]{0,8}$/ },
    { name: "range_lag_id", pattern: /^([1-9]|1[0-9]|20|3[1-9]|4[0-9]|50|6[1-9]|[7-9][0-9]|1[0-4][0-9]|150)$/ },
    { name: "range_lag_id2", pattern: /^1|150$/ },
    { name: "range_1_1000", pattern: /^([1-9][0-9]{0,2}|1000)$/ },
    { name: "range_1_20", pattern: /^([1-2]0|[1]?[1-9])$/ },
    { name: "range_3_89", pattern: /^([3-9]|[1-8][0-9])$/ },
    { name: "range_1_255", pattern: /^((?!0)[1]?\d{1,2}|2[0-4]\d|25[0-5])$/ },
    { name: "range_24_32", pattern: /^2[4-9]|3[0-2]$/ },
    { name: "range_16_1007", pattern: /^(1[6-9]|1\d{2}|[2-9]\d{1,2}|100[0-7])$/ },
    { name: "range_1_999k", pattern: /^(\d{1,5}|[1-8]\d{1,5}|9[0-8]\d{0,4}|99[0-8]\d{0,3}|999000)$/ },
    { name: "range_1500_1000000", pattern: /^(1[5-9]\d{2}|[2-9]\d{3}|[1-9]\d{4,5}|1000000)$/ },
    { name: "range_1000_1999", pattern: /^[1]\d{3}$/ },
    { name: "range_1000_2999", pattern: /^[12]\d{3}$/ },
    { name: "range_10000_99999", pattern: /^\d{5}$/ },
    { name: "range_0_9212", pattern: /^(151[4-9]|15[2-9]\d|1[6-9]\d{2}|[2-8]\d{3}|9[01]\d{2}|920\d|921[0-2])$/ },
    { name: "range_0_9150", pattern: /^(151[4-9]|15[2-9]\d|1[6-9]\d{2}|[2-8]\d{3}|90\d{2}|91[0-4]\d|9150)$/ },
    { name: "range_2_4094", pattern: /^([2-9]|[1-9]\d{1,2}|[1-3]\d{3}|40\d[0-4])$/ },
    { name: "range_2_4096", pattern: /^([2-9]|[1-9]\d{1,2}|[1-3]\d{3}|40\d[0-6])$/ },
    { name: "range_2_4095", pattern: /^([2-9]|[1-9]\d{1,2}|[1-3]\d{3}|40\d[0-5])$/ },
    { name: "range_36_18024", pattern: /^(3[6-9]|[4-9]\d|(?!0)(\d{3,4})|1[0-7]\d{3}|180[0-1]\d|1802[0-4])$/ },
    { name: "trail2_0", pattern: /^\d+[0]{2,10}$/ },
    { name: "less_than_64512", pattern: /^\b([0-9]{1,4}|[1-5][0-9]{4}|6[0-3][0-9]{3}|64[0-4][0-9]{2}|6450[0-9]|6451[0-2])\b$/ },
    { name: "less_than_65468", pattern: /^\b([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-3][0-9]{2}|654[0-6][0-8]|6546[0-8])\b$/ },
    { name: "digits_1thru8", pattern: /^[1-8]{1}$/ },
    { name: "digits_0to4", pattern: /^[0-9]{0,4}$/ },
    { name: "digits_1to4", pattern: /^[0-9]{1,4}$/ },
    { name: "digits_1to2", pattern: /^(\d{1,2})$/ },
    { name: "digits_1to3", pattern: /^(\d{1,3})$/ },
    { name: "digits_1to5", pattern: /^[0-9]{1,5}$/ },
    { name: "digits_1to10", pattern: /^[0-9]{1,10}$/ },
    { name: "digits_2to4", pattern: /^[0-9]{2,4}$/ },
    { name: "digits_2to5", pattern: /^[0-9]{2,5}$/ },
    { name: "digits_3or4", pattern: /^[0-9]{3,4}$/ },
    { name: "digits_5", pattern: /^\d{5}$/ },
    { name: "digits_4", pattern: /^\d{1,4}$/ },
    { name: "digits_1000to10000", pattern: /^(10000|\d{4})$/ },
    { name: "alphanum_nspaces", pattern: /^[a-zA-Z0-9]+$/ },
    { name: "alphanumdash_nspaces", pattern: /^[a-zA-Z0-9-]+$/ },
    { name: "alphanumdash_nspaces_UPPER", pattern: /^[A-Z0-9-]{1,50}$/ },
    { name: "upper_alphanumdot_nspaces", pattern: /^[A-Z0-9.]+$/ },
    { name: "new_eln_device", pattern: /^ELN.[A-Z0-9]+.CL$/ },
    { name: "upper_alphanumdot_nspaces_underscore", pattern: /^[-A-Z0-9.]+$/ },
    { name: "css_interface", pattern: /^([a-zA-Z]+\d+\/\d+\/\d+\/\d+.\d+|[a-zA-Z-]+\d+.\d+)$/ },
    { name: "asr_num", pattern: /^[a-zA-Z0-9_]+:AS[0-9]+$/ },
    { name: "phone_10", pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}|\d{10}$/ },
    { name: "email_addr", pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ },
    { name: "string_no_spaces", pattern: /^[a-zA-Z0-9_-]+$/ },
    { name: "string_no_period", pattern: /^[a-zA-Z0-9!.]+$/ },
    { name: "string_with_period_slash_dot_space", pattern: /^[a-zA-Z0-9_/.\s]+$/ },
    { name: "uppr_string_nospc_9", pattern: /^[A-Z]{0,9}$/ },
    { name: "any_string", pattern: /^[a-zA-Z]+$/ },
    { name: "ipv4_cidr_8to24", pattern: /^((\d{1,2}|1\d{1,2}|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d{1,2}|2[0-4]\d|25[0-5])\/([89]|1\d|2[0-4])$/ },
    { name: "ipv4_cidr_8to32", pattern: /^((\d{1,2}|1\d{1,2}|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d{1,2}|2[0-4]\d|25[0-5])\/([89]|[12]\d|3[0-2])$/ },
    { name: "ipv4_cidr_24to32", pattern: /^2[4-9]|3[0-2]$/ },
    { name: "remote_asn_default", pattern: /^\b([0-9]{1,4}|[1-5][0-9]{4}|6[0-3][0-9]{3}|64[0-4][0-9]{2}|6450[0-9]|6451[0-2])\b$/ },
    { name: "remote_asn_iar", pattern: /^\b7014\b$/ },
    { name: "customer_name", pattern: /^[a-zA-Z0-9]+$/ },
    { name: "customer_name_20", pattern: /^[a-zA-Z0-9-_*+,.$#&^%()@']{1,20}$/ },
    { name: "customer_name_32", pattern: /^[a-zA-Z0-9-_*+,.$#&^%()@']{1,32}$/ },
    { name: "customer_name_50", pattern: /^[a-zA-Z0-9-_*+,.$#&^%()@']{1,50}$/ },
    { name: "customer_name_CAP11", pattern: /^[A-Z]{0,11}$/ },
    { name: "endswith_5zeros", pattern: /^.*00000$/ },
    { name: "group_50", pattern: /^[A-Z0-9-_]{1,50}$/ },
    { name: "ip_v4", pattern: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/ },
    { name: "ip_v4_mod", pattern: /^(((25[0-5]|2[0-4][0-9]|1\d{2}|((?!0)(\d{1,2}))|0)\.){3}(25[0-5]|2[0-4][0-9]|1\d{2}|((?!0)(\d{1,2}))|0))$/ },
    { name: "ip_v6", pattern: /^((([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6}))|(:((:[0-9a-fA-F]{1,4}){1,7}|:)))$/ },
    { name: "as_path", pattern: /^([A-Z]|[0-9]){1,11}:AS(\d{1,5})$/ },
    { name: "slot_slash_port", pattern: /^[0-9]{1,4}\/[0-9]{1,4}$/ },
    { name: "shelf_slash_slot_slash_port", pattern: /^[0-9]{1,4}\/[0-9]{1,4}\/[0-9]{1,4}$/ },
    { name: "string_w_spaces", pattern: /^[A-Za-z0-9\d\s]+$/ },
    { name: "string_no_period", pattern: /^[a-zA-Z0-9!.]+$/ },
    { name: "cidr", pattern: /^\d{1,2}$/ },
    { name: "slash_cidr", pattern: /^\/?\d{1,2}$/ },
    { name: "opt_tag", pattern: /^\d{3}$/ },
    { name: "as_pathasn", pattern: /^([A-Z]|[0-9]){1,11}:AS(\d{1,5})$/ },
    { name: "as_paths", pattern: /^(([6][4][5][1][0-2]|[6][4][5][0][0-9]|[6][4][0-4][0-9][0-9]|[6][0-3][0-9][0-9][0-9]|[0-5][0-9][0-9][0-9][0-9]|[0-9][0-9][0-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9]|[1-9])[+,..*,^,$]{1,5})$/ },
    { name: "TZ_commit", pattern: /^1[4-8]\d{11}$/ },
    { name: "string_no_period", pattern: /^[a-zA-Z0-9][^.]+$/ },
    { name: "string_no_periods", pattern: /^[a-zA-Z0-9][^.]+$/ },
    { name: "bridge_domain", pattern: /^\d+_\d+$/ },
    { name: "vrf", pattern: /^(MS|HI|HO|SP|VSI)-\d{1,6}-[A-Z0-9-]+$/ },
    { name: "NO", pattern: /NO/ },
    { name: "TRUE", pattern: /true/ },
    { name: "VPLS", pattern: /vpls/ },
    { name: "VCID", pattern: /^2(?!(0{6})$)\d{6}$/ },
    { name: "EPIPE", pattern: /epipe/ },
    { name: "DEDICATED", pattern: /^(default|untagged)$/ },
    { name: "csr_interface", pattern: /^\d+\/\d+\/\d+\/\d+\:\d+$/ },
    { name: "csr_interface_2", pattern: /^(([0-2]\/[0-3]\/([0-9]|[1-5]\d|6[0-3])\/([1-9]|19|[1-2][0-8])\:0)|([0-2]\/[0-3]\/([0-9]|[1-5]\d|6[0-3])))$/ },
    { name: "csr_group", pattern: /^([1-3]\d{4}|40000)$/ },
    { name: "csr_dlci", pattern: /^([0-9]|\d{2}|1[0-8]\d|19[0-5])$/ },
    { name: "slot_mda_port", pattern: /^([1-9]|1[0-1])\/([1|2])\/([1-9]|[1-3][0-9]|40)$/ },
    { name: "Rack_Slot_Instance_Port_or_Bundle", pattern: /(^\d{1,2}\/\d{1,2}\/\d{1,2}\/\d{1,2}$)|(^(6553[0-5]|655[0-3][0-5]|65[0-5][0-3][0-5]|6[0-5][0-5][0-3][0-5]|[1-5][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9]|[1-9])$)/ },
    { name: "ALU7750_mac_address", pattern: /[a-fA-F0-9]{2}\:[a-fA-F0-9]{2}\:[a-fA-F0-9]{2}\:[a-fA-F0-9]{2}\:[a-fA-F0-9]{2}\:[a-fA-F0-9]{2}/ },
    { name: "311V_port_number", pattern: /^([1-9]|1[1-9]|2[0-8])$/ },
    { name: "311V_vlan_number", pattern: /^([0-9]|[1-8][0-9]|9[0-8]|1[0-2][0-6]|128|129|1[3-9][0-9]|[2-9][0-9][0-9]|[1-3][0-9][0-9][0-9]|[4][0][0-9][0-6])$/ },
    { name: "numeric_only", pattern: /^\d+$/ },
    { name: "num-dash", pattern: /^[0-9-]+$/ },
    { name: "num_slash_num", pattern: /^\d+\/\d+$/ },
    { name: "local_remote_pe", pattern: /^[a-zA-Z]{3}\d\.[a-zA-Z0-9_]+-[a-zA-Z]{2}$/ },
    { name: "remote_int", pattern: /^([a-zA-Z]+-\d+\/\d+\/\d+\.\d+|ae((?!(0))\d?\d).([2-9]|[1-9]\d{1,2}|[1-3]\d{3}|40\d[0-4]))$/ },
    { name: "range_1_28", pattern: /^([1-9]{1}|1[0-9]|2[0-8])$/ },
    { name: "range_1_24", pattern: /^([1-9]{1}|1[0-9]|2[0-4])$/ },
    { name: "exa_t1_port", pattern: /^\d+\/\d+\/\d+\:\d+$/ },
    { name: "exa_shdsl_port", pattern: /^\d+\/\d+\/\d+$/ },
    { name: "exa_efm_group", pattern: /^\d+\/\d+\/\d+$/ },
    { name: "exa_gige_port", pattern: /^\d+\/[a-z|A-Z]\/\d+$/ },
    { name: "exa_shelf_slot", pattern: /^\d+\/[a-z|A-Z|\d]+$/ },
    { name: "exa_generic_ro_int_20max", pattern: /^[a-zA-Z0-9\/\:]{1,20}$/ },
    { name: "exa_generic_shdsl_20max", pattern: /^\d+\/\d+\/\d+$/ },
    { name: "exa_int_description_100max", pattern: /^[A-Z0-9\<\>\:\s\/]{1,100}$/ },
    { name: "exa_linadapt_t1_10max", pattern: /^[A-Z0-9\-/]{1,10}$/ },
    { name: "exa_stag_20max", pattern: /^[0-9]{1,20}$/ },
    { name: "exa_evc_50max", pattern: /^[A-Z0-9\:]{1,50}$/ },
    { name: "exa_efm_group_20max", pattern: /^[0-9\/]{1,20}$/ },
    { name: "exa_efm_group_15max", pattern: /^[0-9\/]{1,15}$/ },
    { name: "exa_gige_port_20max", pattern: /^\d+\/[a-z|A-Z|0-9]+\/\d+$/ },
    { name: "exa_int_description_50max", pattern: /^[A-Z0-9\:/]{1,50}$/ },
    { name: "exa_int_plus_20max", pattern: /^\d+\/\d+\/\d+\:\d+$/ },
    { name: "exa_subtend_host_desc_50max", pattern: /^[A-Z0-9\"\_]{1,50}$/ },
    { name: "exa_link_20max", pattern: /^[0-9\/\:\-]{1,20}$/ },
    { name: "exa_efm_inuse", pattern: /^Ok$/ },
    { name: "exa_eos_build_int_start", pattern: /^\d+\/\d+\:\d+$/ },
    { name: "exa_eos_build_int_end", pattern: /^\d+\:\d+$/ },
    { name: "exa_eoc_build_int_start", pattern: /^\d+\/\d+$/ },
    { name: "exa_eoc_build_int_end", pattern: /^\d+$/ },
    { name: "exa_dash_only", pattern: /^\-$/ },
    { name: "exa_ip_check_available", pattern: /^Ok$/ },
    { name: "csr_int", pattern: /^\d+\/\d+\/\d+\/\d+(:0)?$/ },
    { name: "digits_10000to99999", pattern: /^(10000|[1-9]\d{4})$/ },                
    { name: "number_between_1_30", pattern: /^([1-9]|[12]\d|30)$/ },
    { name: "mcr_int_unitid", pattern: /.([2-9]|[1-9]\d{1,2}|[1-3]\d{3}|40\d[0-4])$/ },
    { name: "csr_cust_asn_range_1_64495_not_2828", pattern: /^(?!2828)([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-6][0-4][0-4][0-9][0-5])$/ },
    { name: "ip_address", pattern: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ },
    { name: "range_8_32", pattern: /^([8-9]|[12]\d|3[0-2])$/ },
    { name: "range_2_20", pattern: /^([2-9]|[1]?[1-9]|20)$/ },
    { name: "range_1_3", pattern: /^([1-3])$/ },
    { name: "string_with_period", pattern: /[a-zA-Z]+\S+\.+\S+/ },
    
];