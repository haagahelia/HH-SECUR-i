import { StyleSheet } from "@react-pdf/renderer";

export const PDFstyles = StyleSheet.create({
    page: {
        fontSize: 14,
        padding: 40
    },
    title: {
        fontSize: 25,
        paddingBottom: 10
    },
    bold: {
        fontWeight: "bold"
    },

    resultsDiv: {
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: '#837D7D',
    },
    resultsH1: {
        paddingTop: 8,
        paddingRight: 10,
        paddingBottom: 8,
        paddingLeft: 0,
    },

    resultsCountryDiv: {
        textAlign: 'left',
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: '#837D7D',
    },
    resultsCountryUl: {
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 20,
    },
    resultsCountryLi: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        paddingLeft: 0,
    },
    resultsCountryP: {
        paddingTop: 8,
        paddingRight: 10,
        paddingBottom: 8,
        paddingLeft: 10,
    },
    resultsCountryH5: {
        fontSize: 20,
        paddingTop: 8,
        paddingRight: 10,
        paddingBottom: 8,
        paddingLeft: 10,
    },
    resultsCountryRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    resultsSummaryDiv: {
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 15,
        textAlign: 'left',
    },
    
    summaryListLi: {
        display: "flex",
        flexDirection: "column",
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    summaryListUl: {
        paddingLeft: 10,
        gap: 4
    },
    summaryListH5: {
        fontSize: 20,
        paddingTop: 8,
    },
    summaryListP: {
        gap: 4
    },

    riskCircleGreen: {
        backgroundColor: "green",
        padding: 3,
        paddingLeft: 6,
        paddingRight: 6,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100
    },
    riskCircleYellow: {
        backgroundColor: "yellow",
        padding: 3,
        paddingLeft: 6,
        paddingRight: 6,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100    
    },
    riskCircleRed: {
        backgroundColor: "red",
        padding: 3,
        paddingLeft: 6,
        paddingRight: 6,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100
    },
});