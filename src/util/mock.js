import Mock from 'mockjs';


const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
    let articles = [];
    for (let i = 0; i < 4; i++) {
        let newArticleObject = {
            title: Random.ctitle(5, 20), //  Random.csentence( min, max )
            img: Random.dataImage('100x68', Random.color()), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }
 
    return {
        list:articles,
        big:{
            title: Random.ctitle(5, 20), //  Random.csentence( min, max )
            img: Random.dataImage('100x68',Random.color()), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
    };
}

// mock一组数据
const ecarNews = function() {
    let articles = [];
    let big = [];
    for (let i = 0; i < 4; i++) {
        let newArticleObject = {
            title: Random.ctitle(5, 20), //  Random.csentence( min, max )
            img: Random.dataImage('100x68', Random.color()), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }

    for (let i = 0; i < 2; i++) {
        let newArticleObject = {
            title: Random.ctitle(5, 20), //  Random.csentence( min, max )
            img: Random.dataImage('100x68', Random.color()), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        big.push(newArticleObject)
    }
 
    return {
        littleList:articles,
        bigList:big
    };
}




var pageCount = Random.integer(1, 10);
var ids = 10000; //自增长id
var bookListTemplate = {}; //数据模板
function mockPage(currPage){
    if (currPage === pageCount) {
        bookListTemplate = {
            'totalPage': pageCount,
            'pageNo':currPage,
            'list|1-10': [ //最后一页的数据在1-10的区间产生
                {
                    'id|+1': ids,
                    'title': '@ctitle(5, 15)',
                    'desc': '@cparagraph(2, 5)',
                    'img': Random.dataImage('200x100', Random.color()), //经测试MockRandom.dataImage()无效,看了下源码，是有该函数的 - 下的mockjs@1.0.1-beta3包
                    'time': Random.now('yyyy-MM-dd')
                }
            ]
        }
    } else {
        bookListTemplate = {
            'totalPage': pageCount,
            'pageNo':currPage,
            'list|10': [ //有分页的时候一页10条数据
                {
                    'id|+1': ids,
                    'title': '@ctitle(5, 15)',
                    'desc': '@cparagraph(2, 5)',
                    'img': Random.dataImage('200x100', Random.color()), //经测试MockRandom.dataImage()无效,看了下源码，是有该函数的 - 下的mockjs@1.0.1-beta3包
                    'time': Random.now('yyyy-MM-dd')
                }
            ]
        }
    }
    return Mock.mock(bookListTemplate);
}


var tableTemplate = {}; //数据模板
var total = Random.integer(1, 1000);
function mockTable(currPage,pageSize){
    var count = total/pageSize;
    if(total%pageSize>0){
        count = count+1;
    }
    if (currPage === count) {
        tableTemplate = {
            'total': total,
            'rows|1-10': [ //最后一页的数据在1-10的区间产生
                {
                    'id|+1': ids,
                    'title': '@ctitle(5, 15)',
                    'desc': '@cparagraph(2, 5)',
                    'img': Random.dataImage('200x100', Random.color()), //经测试MockRandom.dataImage()无效,看了下源码，是有该函数的 - 下的mockjs@1.0.1-beta3包
                    'time': Random.now('yyyy-MM-dd')
                }
            ]
        }
    } else {
        tableTemplate = {
            'total': total,
            'rows|10': [ //有分页的时候一页10条数据
                {
                    'id|+1': ids,
                    'title': '@ctitle(5, 15)',
                    'desc': '@cparagraph(2, 5)',
                    'img': Random.dataImage('200x100', Random.color()), //经测试MockRandom.dataImage()无效,看了下源码，是有该函数的 - 下的mockjs@1.0.1-beta3包
                    'time': Random.now('yyyy-MM-dd')
                }
            ]
        }
    }
    return Mock.mock(tableTemplate);
}


Mock.mock('/news/index', 'post', produceNewsData);
Mock.mock('/news/ecars', 'post', ecarNews);
Mock.mock('/news/list','post',function(options){
    let params = JSON.parse(options.body);
    let data =  mockPage(params.page);
    return data;
});
Mock.mock('/list','post',function(options){
    let params = JSON.parse(options.body);
    let data =  mockTable(params.pageNo,params.pageSize);
    return data;
});