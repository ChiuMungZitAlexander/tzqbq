module.exports = {
    user: {
        login: {
			path: '/user/login',
			method: 'POST',
			server: 'sys'
		}
    },
    population: {
    	agedistributed: {
    		path: '/population/agedistributed',
    		method: 'POST'
    	},
    	populationdistributed: {
    		path: '/overyearspermanent/populationdistributed',
    		method: 'POST'
    	},
    	varietytrend: {
    		path: '/overyearspermanent/varietytrend',
    		method: 'POST'
    	},
    	flowdistributed: {
    		path: '/flowpopulationd/flowdistributed',
    		method: 'POST'
    	},
    	flowmonth: {
    		path: '/flow/flowmonth',
    		method: 'POST'
    	},
    	reallypopulation: {
    		path: '/reallymap/reallypopulation',
    		method: 'POST'
    	},
    	flowPractitioners: {
    		path: '/practitioners/flowPractitioners',
    		method: 'POST'
    	},
    	comeflowdistributed: {
    		path: '/comeflow/comeflowdistributed',
    		method: 'POST'
    	},
    	residentPopulation: {
    		path: '/resident/residentPopulation',
    		method: 'POST'
    	},
    	twodata: {
    		path: '/ruralandcity/twodata',
    		method: 'POST'
    	},
    	reallytotal: {
    		path: '/reallymap/reallytotal',
    		method: 'POST'
    	},
		comeflowdall: {
    		path: '/comeflow/comeflowdall',
    		method: 'POST'
    	}
    },
    alarmAnalysis: {
    	getCrimeTrendByDate: {
    		path: '/crimeTrend/getCrimeTrendByDate',
    		method: 'POST'
    	},
    	getCrimeTrendByMonth: {
    		path: '/crimeTrend/getCrimeTrendByMonth',
    		method: 'POST'
    	},
    	getCrimeTrendByWeek: {
    		path: '/crimeTrend/getCrimeTrendByWeek',
    		method: 'POST'
    	},
    	alarmType: {
    		path: '/alarmType/alarmType',
    		method: 'POST'
    	},
    	alarmTypeMonth: {
    		path: '/alarmType/alarmTypeMonth',
    		method: 'POST'
    	},
    	getDataByWeek: {
    		path: '/regionalDistribution/getDataByWeek',
    		method: 'POST'
    	},
    	getDataForToday: {
    		path: '/regionalDistribution/getDataForToday',
    		method: 'POST'
    	},
    	getHelpAlarmByDate: {
    		path: '/helpAlarm/getHelpAlarmByDate',
    		method: 'POST'
    	},
    	getHelpAlarmByWeek: {
    		path: '/helpAlarm/getHelpAlarmByWeek',
    		method: 'POST'
    	},
    	getAlarmByHour: {
    		path: '/realTimeAlarm/getAlarmByHour',
    		method: 'POST'
    	},
    	getAlarmTotal: {
    		path: '/realTimeAlarm/getAlarmTotal',
    		method: 'POST'
    	},
    	getFireAlarmByArea: {
    		path: '/realTimeAlarm/getFireAlarmByArea',
    		method: 'POST'
    	},
    	getAreaAlarmTotal: {
    		path: '/realTimeAlarm/getAreaAlarmTotal',
    		method: 'POST'
    	},
    	alarmTypeMom: {
    		path: '/alarmType/alarmTypeMom',
    		method: 'POST'
    	},
    	alarmTypeHaifMom: {
    		path: '/alarmType/alarmTypeHaifMom',
    		method: 'POST'
    	},
    	trafficAccidentMonth: {
    		path: '/trafficAccident/trafficAccidentMonth',
    		method: 'POST'
    	},
    	trafficAccidentWeek: {
    		path: '/trafficAccident/trafficAccidentWeek',
    		method: 'POST'
    	},
    	getDisputeAlarmByWeek: {
    		path: '/disputeAlarm/getDisputeAlarmByWeek',
    		method: 'POST'
    	},
    	getDisputeAlarmByDate: {
    		path: '/disputeAlarm/getDisputeAlarmByDate',
    		method: 'POST'
    	}
    }
}