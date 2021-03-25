require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "%";
var initStrMembers = [];
var initObjMembers = [];
var currStrMembers = [];
var currObjMembers = [];
var voteMembers = [];
var votedMembers = [];

var randomArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
var randomGenerated = [];

const goodKeywords = ["胖次","狐狸尾巴","皮鞭","肛塞","比较污","肉棒","绑缚","精液","K8","保险套","老司机","阴毛","口交","丝袜","项圈","绑带","内衣","羞耻","强制高潮","项圈","暴露","牵绳","童貞毛衣","S","Sub","主动","被动","水手服","正太控","萝莉控","第四爱","传教士","潮吹","火车便当式","肛交","低温蜡烛","炮机","刺轮","刺痛","穿刺","母狗","咸咸的","自拍","强奸","姐姐","哥哥","主人","两个洞被塞","戴绿帽","电击","假阳具","自慰","电爱","玩坏了","憋尿","呻吟","指令","说出羞耻的话","性欲","塞圆珠笔","含住乳头","咬着","淫液","窥淫癖","服侍主人","肛塞","趴下","打屁股","鞭子","鼻勾","奴隶契约","疼痛","塞满","翻白眼","扑倒","像狗狗一样牵着","肉便器","摆M腿","含住手指","女装","裸围"];
const badKeywords = ["胸罩","猫耳","皮拍","口球","比较粗","穴穴","放置","阴液","K9","避孕药","百人斩","胸毛","口爆","网袜","手铐","吊带","泳衣","羞辱","TD","贞操带","走光","缰绳","裸体围裙","Dom","M","S","M","女仆装","大叔控","御姐控","后入","老汉推车","失禁","观音坐莲式","性交","高温蜡烛","飞机杯","蜡烛","钝痛","鞭挞","公狗","黏黏的","偷拍","轮奸","妹妹","弟弟","奴隶","多人蜈蚣","3P","刺轮","炮机","引诱","文爱","喷水了","小便","ASMR","淫话","不小心发出的声音","尿意","塞小跳蛋","含住耳朵","忍着","唾液","意淫","服侍主人指定的人","外星人产卵","跪坐","Spanking","散鞭","肛勾","主奴家规","刺激","灌满","吐舌","被推倒后反推","狗狗状爬行","榨汁姬","照镜子","含住私处","异装","胶衣"];
const reversedBadKeywords = ["胖次","狐狸尾巴","皮鞭","肛塞","比较污","肉棒","绑缚","精液","K8","保险套","老司机","阴毛","口交","丝袜","项圈","绑带","内衣","羞耻","强制高潮","项圈","暴露","牵绳","童貞毛衣","S","Sub","主动","被动","水手服","正太控","萝莉控","第四爱","传教士","潮吹","火车便当式","肛交","低温蜡烛","炮机","刺轮","刺痛","穿刺","母狗","咸咸的","自拍","强奸","姐姐","哥哥","主人","两个洞被塞","戴绿帽","电击","假阳具","自慰","电爱","玩坏了","憋尿","呻吟","指令","说出羞耻的话","性欲","塞圆珠笔","含住乳头","咬着","淫液","窥淫癖","服侍主人","肛塞","趴下","打屁股","鞭子","鼻勾","奴隶契约","疼痛","塞满","翻白眼","扑倒","像狗狗一样牵着","肉便器","摆M腿","含住手指","女装","裸围"];
const reversedGoodKeywords = ["胸罩","猫耳","皮拍","口球","比较粗","穴穴","放置","阴液","K9","避孕药","百人斩","胸毛","口爆","网袜","手铐","吊带","泳衣","羞辱","TD","贞操带","走光","缰绳","裸体围裙","Dom","M","S","M","女仆装","大叔控","御姐控","后入","老汉推车","失禁","观音坐莲式","性交","高温蜡烛","飞机杯","蜡烛","钝痛","鞭挞","公狗","黏黏的","偷拍","轮奸","妹妹","弟弟","奴隶","多人蜈蚣","3P","刺轮","炮机","引诱","文爱","喷水了","小便","ASMR","淫话","不小心发出的声音","尿意","塞小跳蛋","含住耳朵","忍着","唾液","意淫","服侍主人指定的人","外星人产卵","跪坐","Spanking","散鞭","肛勾","主奴家规","刺激","灌满","吐舌","被推倒后反推","狗狗状爬行","榨汁姬","照镜子","含住私处","异装","胶衣"];
var badStrMember = "";
var badObjMember = {};

client.on('ready', () => {
    console.log(`Bot initialized.`);
    client.user.setActivity('皮卡的指令', { type: 'LISTENING' }); 
});

client.on('message', (message) => {
    if (message.author.bot) return;
    
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

        if (CMD_NAME === 'add') { 
            if (args.length === 0 || !message.mentions.users) {
                return message.reply('请选择你的对象。');
            }
            let objMemberVar = message.mentions.users.array();

            //validate duplicate users
            if (initObjMembers.some(item => objMemberVar.includes(item))) {
                return message.channel.send(`玩家已被选择。`);
            }

            if (objMemberVar) {
                Array.prototype.push.apply(initObjMembers,objMemberVar);
                const nickname = message.mentions.users.map(user => {
                    return `${user.username}`;
                });
                Array.prototype.push.apply(initStrMembers,nickname);
                message.channel.send(`${objMemberVar} 已加入。`);
                return;
            } else {
                return message.channel.send('没有此玩家。');
            }
        }

        if (CMD_NAME === 'remove') {
            if (args.length === 0 || !message.mentions.users) {
                return  message.reply('请选择你的对象。');
            }
            let objMemberVar = message.mentions.users.array();

            //validate in-game users
            if (!initObjMembers.some(item => objMemberVar.includes(item))) {
                return message.channel.send(`玩家不在游戏内。`);
            }

            if (objMemberVar) {
                for( var i = 0; i < initObjMembers.length; i++){    
                    if (initObjMembers.some(item => objMemberVar.includes(item))) {     
                        initObjMembers.splice(i, 1); 
                    }   
                }

                const nickname = message.mentions.users.map(user => {
                    return `${user.username}`;
                });

                for( var i = 0; i < initStrMembers.length; i++){    
                    if ( initStrMembers[i] === nickname) {     
                        initStrMembers.splice(i, 1); 
                    }   
                }

                message.channel.send(`${objMemberVar} 已被移除。当前在游戏的玩家：`);                 
                if (initObjMembers.length == 0) {
                    message.channel.send(`无玩家。`);
                } else {
                    var oneLine = initObjMembers.join('\n');
                    message.channel.send(oneLine);
                }
            } else {
                return message.channel.send('没有此玩家。');
            }
        }
        
        if (CMD_NAME === 'test') {
            let success = true;
            initObjMembers.forEach(member => {
                if (!member.bot) {
                    member.send("公告！长风的裸围裙照片还没交上！\n信息发送测试成功。").catch(async err => {
                        message.channel.send(`无法传送信息至 ${member}。请打开你的私人私信开关再输入 %start 以开始游戏。`);
                        success = false;
                    });
                    // The above error would most likely be due to the user's privacy settings within the guild.
                }
            });

            if(success) {
                message.channel.send("测试成功。");
            } else {
                message.channel.send("测试完毕。请测试失败的玩家修改设定。");
            }
        }

        if (CMD_NAME === 'start') {
            if (initStrMembers.length !== 5) {
                return message.channel.send('未满5个玩家不能开始游戏。');
            }

            messageGameMember(message);
        }

        if (CMD_NAME === 'vote') {
            if (args.length === 0 || !message.mentions.users) {
                return message.reply('请选择你的对象。');
            }

            //validate already voted users
            if (votedMembers.includes(message.author)) {
                return message.channel.send(`已经在此回合投票了。`);
            }

            //validate not in-game users
            if (!currObjMembers.includes(message.author)) {
                return message.channel.send(`玩家不在游戏内。无法投票。`);
            }

            if (args[0] === "skip") {
                votedMembers.push(message.author);
                voteMembers.push("");
                message.channel.send(`当前投票人数： ` + voteMembers.length + `/` + currObjMembers.length);

                var oneLine = votedMembers.join(', ');
                message.channel.send(`当前已投票玩家： ` + oneLine);
            }else if (message.mentions.users) {
                //validate duplicate users
                if (!currObjMembers.includes(message.mentions.users.first())) {
                    return message.channel.send(`玩家不在游戏里。`);
                } else {
                    votedMembers.push(message.author);
                    const nickname = message.mentions.users.first();
                    voteMembers.push(nickname.username);
                    message.channel.send(`当前投票人数： ` + voteMembers.length + `/` + currObjMembers.length);

                    var oneLine = votedMembers.join(', ');
                    message.channel.send(`当前已投票玩家： ` + oneLine);
                }  
            } else {
                return message.channel.send('没有此玩家或如果要弃票请输入 %vote skip');
            }

            //validate all members voted or not to execute function
            if (voteMembers.length == currStrMembers.length) {
                compareMemberVotes(voteMembers, message);
                return;
            } else {
                return;
            }   
        }

        if (CMD_NAME === 'votetimer') {
            if (!votedMembers.length == 0) {
                return message.channel.send("请等待当前投票环节结束再使用此指令。");
            }
            message.channel.send("已启动20秒投票。");
            setTimeout(function(){
                if (voteMembers.length !== currStrMembers.length){
                    message.channel.send("当前为无投票玩家弃票。");
                    var i;
                    for (i = voteMembers.length; i < currStrMembers.length; i++) {
                        voteMembers.push("");
                        votedMembers.push({});
                    }
                    compareMemberVotes(voteMembers, message);
                    return;
                } else {
                    return;              
                }
            }, 20000); 
        }

        if (CMD_NAME === 'resetgame') {
            currStrMembers.length = 0;
            currObjMembers.length = 0;
            voteMembers.length = 0;
            badStrMember = "";
            badObjMember = {};
            return message.channel.send("游戏已重置。 如要继续请输入下列指令： %start");
        }

        if (CMD_NAME === 'resetall') {
            initObjMembers.length = 0;
            initStrMembers.length = 0;
            currStrMembers.length = 0;
            currObjMembers.length = 0;
            voteMembers.length = 0;
            randomGenerated.length = 0;
            badStrMember = "";
            badObjMember = {};
            return message.channel.send("清除玩家名单。若要加入游戏请在指令输入 %add 后艾特成员名称。");
        }

        if (CMD_NAME === 'love') {
            return message.channel.send("爱你哦 皮卡酱宝贝 啊呜");
        }

        if (CMD_NAME === 'help') {
            return message.channel.send("%helptw = 繁體中文幫助欄\n%helpcn = 简体中文帮助栏");
        }

        if (CMD_NAME === 'helptw') {
            return message.channel.send("《我是臥底》遊戲方式：\n1.將玩家名字加入遊戲序列：%add @人名 \n2.確認當前玩家：%current \n3.機器人私信玩家暗號：%start \n4.玩家按照語音房順序，輪流給出關於暗號的描述(不可直接講出暗號是什麼) \n5.講完一輪後表決出最像是間諜的遊戲玩家：%vote @人名 投票 / %vote skip 棄票 \n重複4.5.直到找出間諜(玩家勝利)或是玩家數等於間諜數(間諜勝利) \n6.重置以開啟新一輪遊戲：%resetgame \n\n新一輪遊戲中若有人退出可使用：%remove 移除不參與玩家 \n\n\n如對遊戲有其他疑問可使用：%help  獲得幫助。需繁體可使用：%helptw，簡體可使用：%helpcn。");
        }

        if (CMD_NAME === 'helpcn') {
            return message.channel.send("《我是卧底》游戏方式：\n1.将玩家名字加入游戏序列：%add @人名 \n2.确认当前玩家：%current \n3.机器人私信玩家暗号：%start \n4.玩家按照语音房顺序，轮流指定关于暗号的描述（不可 \n5.讲完一轮后投票出最像是间谍的游戏玩家：%vote @人名投票/%vote skip弃票 \n重复4.5.直到意识到间谍（玩家胜利）或者 玩家数等于间谍数（间谍胜利）\n6.重置以开启新一轮游戏：%resetgame \n\n新一轮游戏中若有人退出可使用：%remove可移除不参与玩家 \n\n\n如 对游戏有其他疑问可使用：%help获得帮助。需繁体可使用：%helptw，简体可使用：%helpcn。");
        }

        if (CMD_NAME === 'current') {
            message.channel.send("当前游戏玩家:");
            var oneLine = initObjMembers.join('\n');
            message.channel.send(oneLine);
        }
    }
});

function rolledNumbers(array, el) {
    for(var i = 0 ; i < array.length; i++) 
        if(array[i] == el) return true;
    return false;
}

function messageGameMember(message){
    if (randomGenerated.length == 81) {
        randomGenerated.length = 0;
    }

    let switchRoles = Math.floor(Math.random() * 2);
    let randomKeyword = 0;

    var rand = randomArray[Math.floor(Math.random()*randomArray.length)];
    if(!rolledNumbers(randomGenerated, rand)) {
        randomGenerated.push(rand); 
        randomKeyword = rand;
    }

    let good = "";
    let bad = "";
    if (switchRoles == 0) {
        good = goodKeywords[randomKeyword];
        bad = badKeywords[randomKeyword];
    } else {
        good = reversedGoodKeywords[randomKeyword];
        bad = reversedBadKeywords[randomKeyword];
    }
    

    let randomMember = Math.floor(Math.random() * initStrMembers.length);
    badStrMember = initStrMembers[randomMember];
    badObjMember = initObjMembers[randomMember];

    let msgBadMember = [];
    msgBadMember.push(initObjMembers[randomMember]);

    let msgObjMembers = [];
    Array.prototype.push.apply(msgObjMembers,initObjMembers);

    for( var i = 0; i < msgObjMembers.length; i++){    
        if ( msgObjMembers[i] === badObjMember) {     
            msgObjMembers.splice(i, 1); 
        }   
    }

    message.channel.send(`已私信成员。请检查你的私人信息。`);

    msgObjMembers.forEach(member => {
        if (!member.bot) {
            member.send(good)
            .catch(() => message.channel.send(`无法传送信息至 ${member}。请打开你的私人私信开关。开关开启后请输入 %resetgame 再输入 %start 以开始游戏。`));
            // The above error would most likely be due to the user's privacy settings within the guild.
        }  
    });

    msgBadMember.forEach(member => {
        if (!member.bot) {
            member.send(bad)
            .catch(() => message.channel.send(`无法传送信息至 ${member}。请打开你的私人私信开关。开关开启后请输入 %resetgame 再输入 %start 以开始游戏。`));
            // The above error would most likely be due to the user's privacy settings within the guild.
        }  
    }); 

    Array.prototype.push.apply(currStrMembers,initStrMembers);
    Array.prototype.push.apply(currObjMembers,initObjMembers);
}

function compareMemberVotes(voteMembers, message)
{
    var skip = false;

    if(voteMembers.length == 0) return null;
    var modeMap = {}, maxEl = voteMembers[0], maxCount = 1;

    for(var i = 0; i < voteMembers.length; i++)
    {
        var el = voteMembers[i];

        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;

        if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
        } else if (modeMap[el] == maxCount) {
        maxEl += "&" + el;
        maxCount = modeMap[el];
        }
    }

    if (badStrMember === maxEl) {
        message.channel.send(`游戏已结束。卧底是 ${badObjMember}`);
        currStrMembers.length = 0;
        currObjMembers.length = 0;
        voteMembers.length = 0;
        votedMembers.length = 0;
        badStrMember = "";
        badObjMember = {};
        return;
    }

    for( var i = 0; i < currStrMembers.length; i++){    
        if ( currStrMembers[i] === maxEl) { 
            let objMemberVar = currObjMembers[i];
            message.channel.send(`已指名剔除 ${objMemberVar}`);    
            currStrMembers.splice(i, 1); 
            currObjMembers.splice(i, 1);
            voteMembers.length = 0;
            votedMembers.length = 0;
            skip = false;
            break;
        }else {
            skip = true;
        } 
    }  
    
    if (skip) {
        voteMembers.length = 0;
        votedMembers.length = 0;
        return message.channel.send("没有人被指名剔除。");
    }

    if (currStrMembers.length <= 2) {
        message.channel.send(`游戏已结束。卧底是 ${badObjMember}`);
        currStrMembers.length = 0;
        currObjMembers.length = 0;
        voteMembers.length = 0;
        votedMembers.length = 0;
        badStrMember = "";
        badObjMember = {};
        return;
    }
}

client.login(process.env.DISCORDJS_BOT_TOKEN);