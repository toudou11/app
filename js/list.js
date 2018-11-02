  
  
  
  mui.plusReady(function () {
  console.log('plus 加载完成');
  
  // 点击li 监听事件
  mui('.mui-table-view').on('click', '.mui-table-view-cell', function () {
    
    var type = this.getAttribute('type');
    var name = this.getAttribute('name');
   var site = this.getAttribute('site');
   
    console.log(site);
    
    // 打开详情页
    mui.openWindow({
      url: 'detill.html',
      id: 'detill.html',
      styles: {
        top: '0px',
        bottom: '50px'
      },
      
      extras: {
        infoType: type,
        infoName: name,
        infoSite: site,
        // info: infoDetail
      },
      
      show: {
        autoShow: true,
        aniShow: 'slide-in-left',
        duration: 1000
      },
      waiting: {
        title: '疯狂加载中....'
      }
    })
    
  })
})

  
  
  
  
  
  
  
  
  
  
  
  var vm = new Vue({
  el: '#app',
  data: {
    list: [],
    page:1,//页面
    pageSize:20,//每页显示的数目
    pages:1,//一个的页数
  },
  
  methods: {
    getList: function() {
      var that = this;
      
      mui.get('http://route.showapi.com/126-2', {
        showapi_appid: 79200,
        showapi_sign: 'fe88bf61f2b641d69c9a6ce791179d60'
      }, function (result) {
        if (result.showapi_res_code === 0) {
          that.list = result.showapi_res_body.pagebean.contentlist;
          console.log(that.list)
        } else {
          mui.toast(result.showapi_res_error);
        }
      })
    },
    downfn:function(callback, isMore){
    	this.page = 1;
    	mui('#refreshContainer').pullRefresh().refresh(true);
    	this.getList(function() {
				mui('#refreshContainer').pullRefresh().endPulldown();
			});
    	
    }
  },
  
  created: function () {
    this.getList();
  }
})
  
mui.init({
pullRefresh : {
    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      height:50,//可选,默认50.触发下拉刷新拖动距离,
      auto: true,//可选,默认false.首次加载自动下拉刷新一次
      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
      callback :vm.downfn //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    }
}
});