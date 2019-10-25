

angular.module('app')
.controller('CVue', function() {

	// Vue.component('abc-abc', {
	// 	template: '<div>AAABBBCCC</div>'
	// })	

	// Vue.directive('test', function(el, binding) {
	// 	el.style.color = 'blue'

	// 	if (binding.modifiers.large) {
	// 		alert()
	// 	}
	// })
	new Vue({
		el: '#entry',
		data: {
			showAdd: false,
			show: true
		},
		methods: {
			showAddFn: function() {
				this.showAdd = true;
			},
                    showOrder: function() {
                    	var list = []

                    	var list2 = ['头', '二', '三', '四', '五',
                    	    '六', '七', '八', '九'
                    	]
                    	for (var i = 0; i <list2.length; i++) {
                    	    var data = {
                    	        id: i,
                    	        value: list2[i] + '条'
                    	    }
                    	    list.push(data);
                    	}
                        var that = this;
                        new IosSelect(1, [list], {
                            itemHeight: 50,
                            itemShowCount: 5,
                            oneLevelId: 0,
                            callback: function(obj) {
                                that.height = obj.value;
                            }
                        });
                    },
			                    showAge: function() {
                        // this.hmt('我的','修改年龄')
                        // var data = this.birth.match(/(\d{4})-(\d{2})-(\d{2})/);
                        var now = new Date()

                        function formatYear() {
                            var arr = [];
                            for (var i = 1900; i <= now.getFullYear(); i++) {
                                arr.push({
                                    id: i + '',
                                    value: i + '年'
                                });
                            }
                            return arr;
                        }

                        function formatMonth() {
                            var arr = [];
                            var month = 12;

                            for (var i = 1; i <= 12; i++) {
                                arr.push({
                                    id: i + '',
                                    value: i + '月'
                                });
                            }
                            return arr;
                        }

                        function formatDate(count) {
                            var arr = [];
                            for (var i = 1; i <= count; i++) {

                                arr.push({
                                    id: i + '',
                                    value: i + '日'
                                });
                            }
                            return arr;
                        }

                        var yearData = function(callback) {
                            callback(formatYear())
                        }
                        var monthData = function(year, callback) {
                            callback(formatMonth());
                        };

                        var dateData = function(year, month, callback) {
                            if (/^(1|3|5|7|8|10|12)$/.test(month)) {
                                callback(formatDate(31));
                            } else if (/^(4|6|9|11)$/.test(month)) {
                                callback(formatDate(30));
                            } else if (/^2$/.test(month)) {
                                if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                                    callback(formatDate(29));
                                } else {
                                    callback(formatDate(28));
                                }
                            } else {
                                throw new Error('month is illegal');
                            }
                        };


                        var that = this;

                        var oneLevelId = now.getFullYear();
                        var twoLevelId = now.getMonth() + 1;
                        var threeLevelId = now.getDate();


                        new IosSelect(3, [yearData, monthData, dateData], {
                            itemHeight: 50,
                            itemShowCount: 5,
                            oneLevelId: oneLevelId,
                            twoLevelId: twoLevelId,
                            threeLevelId: threeLevelId,
                            callback: function(year, month, day) {

                                if (month.id < 10) {
                                    month.id = '0' + month.id;
                                }
                                if (day.id < 10) {
                                    day.id = '0' + day.id;
                                }

                                that.birth = year.id + '-' + month.id + '-' + day.id;

                                var sel = new Date(that.birth);

                                that.age = Math.floor((now - sel) / (1000*60*60*24*365));
                            }
                        });
                    },


		}
	})
})