<template>
  <div>

    <div class="learing-course" style="cursor: default">

      <div class="course-cont">
        <div class="course-cont-top-video" style="position: relative;">
          <div class="video-box">
            <div class="top text-center">
              {{coursename}} &nbsp;<span style="font-size: 14px">当前章节：<span
              style="color:dodgerblue">{{chapterName}}</span></span>
            </div>
            <div class="video text-center" style="padding-right: 55px;">
              <div class="video-mine">
                <div class="cls-video">
                  <div id="vdplay">

                    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions">
                    </video-player>
                  </div>
                  <div class="vdControl">
                    <!--<div class="play" onclick="vdPlay()">播放</div>-->
                  </div>
                </div>
              </div>
            </div>
            <div class="course-nav">
              <div class="nav-stacked text-center">
                <li class="nav"><a :href="url" class="glyphicon glyphicon-list-alt"><span>目录</span></a></li>
                <li class="lab-note"><a :href="url" class="glyphicon glyphicon-user"><span>笔记</span></a></li>
                <li class="lab-ask"><a :href="url" class="glyphicon glyphicon-cog"><span>问答</span></a></li>
                <li class="lab-com"><a :href="url" class="glyphicon glyphicon-duplicate"><span>评论</span></a></li>
              </div>
            </div>
            <div class="note" style="cursor: default">
              <div class="note-box">
                <div class="note-lab"><span class="active">我的笔记</span><span>更多笔记</span></div>
                <div class="note-item-cont">
                  <div class="my-note">
                    <div class="textarea-box">
                      <textarea name="my-note" maxlength="500" @input="notesInput" v-model="notes"
                                id="notes" placeholder="在这里输入我的笔记..."></textarea>
                      <div class="info"> &emsp;&emsp;<span>您已输入<span
                        style="color: red">{{500-remainNotes}}</span>/500 字</span><span class="not-but"
                                                                                        @click="publishNotes"
                                                                                        style="cursor: pointer">提交</span>
                      </div>
                    </div>
                    <ul class="my-item-box">
                      <li v-for="notes in myNotesList">
                        <div style="cursor: default"><span><img src="/static/images/studyuser.png" alt=""></span><span
                          class="name">我</span>
                        </div>
                        <div class="cont">
                          <span v-html="notes.notes"></span>
                        </div>
                        <div class="operation"><span>{{notes.createTime | formatDate}}</span>
                          <div class="oper-box"><span style="cursor: pointer" @click="deleteNotes(notes.id)"><i
                            class="i-del"></i>删除</span><span style="cursor: pointer" @click="myThumbsUp"><i
                            class="i-laud"></i>我的赞{{notes.praise}}</span></div>
                        </div>
                      </li>
                    </ul>
                    <a :href="url" class="more" @click="refreshNotes">刷&emsp;&emsp;新</a>
                  </div>
                  <div class="sel-note">
                    <ul class="my-item-box">
                      <li v-for="notes in otherNotesList">
                        <div style="cursor: default"><span><img src="/static/images/studyuser.png" alt=""></span><span
                          class="name" v-if="userMap[notes.userId] && userMap[notes.userId].name">
                          {{userMap[notes.userId].name}}
                        </span></div>
                        <div class="cont">
                          <span v-html="notes.notes"></span>
                        </div>
                        <div class="operation"><span>{{notes.createTime | formatDate}}</span>
                          <div class="oper-box"><span style="cursor: pointer" @click="thumbsUp(notes.id)"><i
                            class="i-laud"></i>点赞{{notes.praise}}</span></div>
                        </div>
                      </li>
                    </ul>
                    <a :href="url" @click="refreshNotes" class="more">刷&emsp;&emsp;新</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="ask">
              <div class="ask-box">
                <div class="note-lab"><span class="active">我的问答</span><span>更多问答</span></div>
                <div class="note-item-cont">
                  <div class="my-note">
                    <div class="textarea-box">
                      <input type="text" class="ask-title" name="my-question_title" maxlength="20"
                             @input="questionTitleInput" v-model="questionTitle"
                             id="questionTitle" value="" placeholder="请输入问题标题(最多20个字)">
                      <textarea name="my-question" maxlength="240" @input="questionInput" v-model="question"
                                id="question" placeholder="请输入问题描述(最多240个字)"></textarea>
                      <div class="info" style="cursor: default;">&emsp;&emsp;<span>标题:<span
                        style="color: red">{{20-remainQuestionTitle}}</span>/20 字;&nbsp;描述:<span
                        style="color: red">{{240-remainQuestion}}</span>/240 字</span><span class="not-but"
                                                                                           @click="publishQuestion"
                                                                                           style="cursor:pointer;">提交问题</span>
                      </div>
                    </div>
                    <ul class="my-item-box">
                      <li v-for=" question in myQuestionList" style="cursor: default;">
                        <div><span><img src="/static/images/studyuser.png" alt=""></span><span
                          class="name">我</span><span class="our-answer" @click="deleteQuestion(question.id)">删除问题</span>
                        </div>
                        <div class="tit"><span v-html="question.title"></span></div>
                        <div class="cont">
                          <span v-html="question.content"></span>
                        </div>
                        <div class="operation"><span>{{question.createTime | formatDate}}</span>
                          <div class="oper-box"><span>回答 {{question.children.length}}</span>
                            <span @click="hideAnswerDiv(question.id)" v-if="answerStatus == question.id " style="cursor: pointer">收起回答</span>
                            <span @click="showAnswerDiv(question.id)" v-else style="cursor: pointer">展开回答</span>
                          </div>
                        </div>
                        <div class="cont" :id="question.id" style="display: none">
                          <div
                            style="cursor: default;color: #00a4ff;font-size: 16px;font-weight:600;text-align:center;">
                            回答区
                          </div>
                          <div style="cursor: default;color: #999;font-size: 14px;text-align:center;"
                               v-if="question.children.length == 0">暂无回答
                          </div>
                          <div v-for="children in question.children">
                            <div><span><img src="/static/images/studyuser.png"
                                            alt="" style="width:30px;height:30px"></span><span v-if="questionUserMap[children.userId] && questionUserMap[children.userId].name" style="color: #00a4ff">{{questionUserMap[children.userId].name}}</span><span style="float: right">{{children.createTime | formatDate}}</span><br>
                              <div style="margin-left: 30px"><span v-html="children.content" ></span></div>
                            </div>
                          </div>
                        </div>

                      </li>
                    </ul>
                    <a :href="url" class="more" @click="refreshQuestion">刷&emsp;&emsp;新</a>
                  </div>
                  <div class="sel-note">
                    <ul class="my-item-box">
                      <li v-for="question1 in otherQuestionList">
                        <div><span><img src="/static/images/studyuser.png" alt=""></span><span
                          class="name" v-if="questionOtherUserMap[question1.userId] && questionOtherUserMap[question1.userId].name">{{questionOtherUserMap[question1.userId].name}}</span>
                          <span class="our-answer" @click="hideAskDiv(question1.id)" v-if="askStatus == question1.id ">收起答框</span>
                          <span class="our-answer" @click="showAskDiv(question1.id)" v-else>我来回答</span>
                        </div>
                        <div class="tit"><span v-html="question1.title"></span></div>
                        <div class="cont">
                          <span v-html="question1.content"></span>
                        </div>
                        <div :id="question1.id" style="display: none">
                       <textarea name="answer" maxlength="240" @input="answerInput" v-model="answer"
                                 id="answer" placeholder="请输入您的答案(最多240个字)"></textarea>
                          <span>您已输入<i
                            style="color: red">{{240-remainAnswer}}</i>/240 字</span><span class="" @click="publishAsk(question1.id)"
                                                                                          style="float: right;margin-right:20px;border:solid 1px #00a4ff;cursor: pointer;color: #00a4ff; border-radius: 3px;padding: 3px 10px;">提交回答</span>
                          <br><br>
                        </div>
                        <div class="operation"><span>{{question1.createTime | formatDate}}</span>
                          <div class="oper-box"><span>回答 {{question1.children.length}}</span>
                            <span @click="hideAnswerDiv2(question1.id+'oth')" v-if="answerStatus2 == question1.id+'oth' " style="cursor: pointer">收起回答</span>
                            <span @click="showAnswerDiv2(question1.id+'oth')" v-else style="cursor: pointer">展开回答</span>
                          </div>
                        </div>
                        <div class="cont" :id="question1.id+'oth'" style="display: none">
                          <div
                            style="cursor: default;color: #00a4ff;font-size: 16px;font-weight:600;text-align:center;">
                            回答区
                          </div>
                          <div style="cursor: default;color: #999;font-size: 14px;text-align:center;"
                               v-if="question1.children.length == 0">暂无回答
                          </div>
                          <div v-for="(children1,index) in question1.children">
                            <div><span><img src="/static/images/studyuser.png"
                                            alt="" style="width:30px;height:30px"></span>
                              <span v-if="questionOtherUserMap[children1.userId] && questionOtherUserMap[children1.userId].name && children1.userId != userId" style="color: #00a4ff">{{questionOtherUserMap[children1.userId].name}}</span>
                              <span v-if="children1.userId == userId" style="color: #00a4ff">我</span>
                              <span style="float: right">{{children1.createTime | formatDate}}</span><br>
                              <div style="margin-left: 30px;"><span v-html="children1.content"></span><br v-if="index != question1.children.length-1"></div>
                              <div v-if="userId == children1.userId" ><span style="float: right;font-size: 12px;cursor: pointer" @click="deleteAsk(children1.id)">删除回答</span>
                              <br></div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <a :href="url" class="more" @click="refreshQuestion">刷&emsp;&emsp;新</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="com" style="cursor: default">
              <div class="com-box">
                <div class="note-item-cont">
                  <div class="my-note">
                    <div class="evaluate">
                      <div class="eva-top">
                        <div class="tit">课程评分</div>
                        <div class="star">
                          <div class="score" id="score1"><i>5</i></div>
                        </div>
                        <span class="star-score"> <i>5</i> 分</span></div>
                      <div class="eva-cont">
                        <div class="tit">课程评价</div>
                        <div class="text-box">
                          <textarea class="form-control" name="my-comment" maxlength="240" @input="commentInput"
                                    v-model="comment"
                                    id="comment" rows="5" placeholder="扯淡、吐槽、表扬、鼓励......想说啥说啥！但是请文明用语哦~"></textarea>
                          <div class="text-right">&nbsp;<i style="font-size: 14px;font-weight: 500 ">您已输入<i
                            style="color: red">{{240-remainComment}}</i>/240 字</i><span @click="publishComment"
                                                                                        style="float: right">发表评论</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul class="my-item-box">
                      <li>
                        <div>
                          <span><img src="/static/images/studyuser.png" alt=""></span>
                          <span class="name">优课在线</span>&emsp;<span style="color: orangered">置顶</span>
                          <div class="item-rit">
                            <div class="star-show">
                              <div class="score"><i>5</i></div>
                            </div>
                            <div class="showSt">评分 <span>5分</span></div>
                          </div>
                        </div>
                        <div class="cont">
                          扯淡、吐槽、表扬、鼓励......想说啥说啥！但是请大家文明用语哦~
                        </div>
                        <div class="operation"><span>2020-03-07 14:08</span>
                          <div class="oper-box"></div>
                        </div>
                      </li>
                      <li v-for="comment in commentList">
                        <div>
                          <span><img src="/static/images/studyuser.png" alt=""></span>
                          <span class="name"
                                v-if="commentUserMap[comment.userId] && commentUserMap[comment.userId].name">{{commentUserMap[comment.userId].name}}</span>
                          <div class="item-rit">
                            <div class="star-show">
                              <div class="score"><i>{{comment.score}}</i></div>
                            </div>
                            <div class="showSt">评分 <span>{{comment.score}}分</span></div>
                          </div>
                        </div>
                        <div class="cont">
                          <span v-html="comment.comment"></span>
                        </div>
                        <div class="operation"><span>{{comment.createTime | formatDate}}</span>
                          <div class="oper-box"><span style="cursor: pointer"
                                                      @click="deleteComment(comment.userId,comment.id)"
                                                      v-if="comment.userId == userId"><i
                            class="i-del"></i>删除评论</span></div>
                        </div>
                      </li>
                    </ul>
                    <a :href="url" class="more" @click="refreshComment">刷&emsp;&emsp;新</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="navCont">
              <div class="course-weeklist">
                <div class="nav nav-stacked" v-for="teachplan_first in teachplanList">
                  <div class="tit nav-justified text-center"><i class="pull-left glyphicon glyphicon-th-list"></i>{{teachplan_first.pname}}<i
                    class="pull-right"></i></div>
                  <li v-if="teachplan_first.children!=null"
                      v-for="teachplan_second in teachplan_first.children"><i
                    class="glyphicon glyphicon-check"></i>
                    <a :href="url" @click="study(teachplan_second.id)">
                      {{teachplan_second.pname}}
                    </a>
                  </li>
                </div>
                <br>
                <br>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  let sysConfig = require('@/../config/sysConfig')
  import * as courseApi from '../api/course'
  import * as systemApi from '@/base/api/system'
  import utilApi from '../../../common/utils';


  export default {
    components: {},
    data() {
      return {
        url: '',//当前url
        courseId: '',//课程id
        chapter: '',//章节Id
        chapterName: '章节名称',//章节名称
        notes: '',
        comment: '',
        score: '',
        question: '',
        answer: '',
        answerStatus: 0,
        answerStatus2: 0,
        askStatus: 0,
        questionTitle: '',
        userId: '',
        errorCode: 0,
        commenErrorCode: 0,
        questionErrorCode: 0,
        remainNotes: 500,//笔记剩余字数
        remainQuestion: 240,//问答剩余字数
        remainQuestionTitle: 20,//问答标题剩余字数
        remainAnswer: 240,//问答标题剩余字数
        remainComment: 240,//评论剩余字数
        coursename: '课程名称',//课程名称
        coursepic: '',//课程图片
        teachplanList: [],//课程计划
        myNotesList: [],
        otherNotesList: [],
        myQuestionList: [],
        otherQuestionList: [],
        commentList: [],
        userMap: {},
        commentUserMap: {},
        questionUserMap:{},
        questionOtherUserMap:{},
        playerOptions: {//播放参数
          autoplay: false,
          controls: true,
          sources: [{
            type: "application/x-mpegURL",
            src: ''
          }]
        },

      }
    },

    methods: {
      playvideo(video_src) {
        this.playerOptions.sources[0].src = video_src
        this.playerOptions.autoplay = true
      },
      notesInput() {
        var txtVal = this.notes.length;
        this.remainNotes = 500 - txtVal;
      },
      commentInput() {
        var txtVal = this.comment.length;
        this.remainComment = 240 - txtVal;
      },
      questionInput() {
        var txtVal = this.question.length;
        this.remainQuestion = 240 - txtVal;
      },
      questionTitleInput() {
        var txtVal = this.questionTitle.length;
        this.remainQuestionTitle = 20 - txtVal;
      },
      answerInput() {
        var txtVal = this.answer.length;
        this.remainAnswer = 240 - txtVal;
      },
      showAskDiv(id) {
        if (this.askStatus != 0) {
          this.hideAskDiv(this.askStatus);
        }
        document.getElementById(id).style.display = "block";
        this.askStatus = id;
      },
      hideAskDiv(id) {
        document.getElementById(id).style.display = "none";
        this.answer='';
        this.remainAnswer=240;
        this.askStatus = 0;
      },
      showAnswerDiv2(id) {
        if (this.answerStatus2 != 0) {
          this.hideAnswerDiv2(this.answerStatus2);
        }
        document.getElementById(id).style.display = "block";
        this.answerStatus2 = id;
      },
      hideAnswerDiv2(id) {
        document.getElementById(id).style.display = "none";
        this.answerStatus2 = 0;
      },
      showAnswerDiv(id) {
        if (this.answerStatus != 0) {
          this.hideAnswerDiv(this.answerStatus);
        }
        document.getElementById(id).style.display = "block";
        this.answerStatus = id;
      },
      hideAnswerDiv(id) {
        document.getElementById(id).style.display = "none";
        this.answerStatus = 0;
      },
      //发表问题
      publishQuestion() {
        if (this.questionTitle.length == 0) {
          this.$message.warning("请输入标题！");
          return;
        }
        if (this.question.length == 0) {
          this.$message.warning("请输入内容！");
          return;
        }
        courseApi.publish_question(this.courseId, this.chapter, this.userId, this.questionTitle, this.question).then((res) => {
          if (res.success) {
            this.$message.success("提交成功！别人可以看见你的问题啦~");
            this.questionTitle = '';
            this.question = '';
            this.remainQuestionTitle=20;
            this.remainQuestion = 240;
            this.getMyQuestion();
          } else if (res.message) {
            this.$message.error(res.message);
          } else {
            this.$message.error("提交失败，请重新提交！");
          }
        })
      },
      //发表回答
      publishAsk(id) {
        if (this.answer.length == 0) {
          this.$message.warning("请输入内容！");
          return;
        }
        courseApi.publish_ask(this.courseId, this.chapter, this.userId, id, this.answer).then((res) => {
          if (res.success) {
            this.$message.success("提交成功！别人可以看见你的回答啦~");
            this.answer = '';
            this.remainAnswer = 240;
            this.hideAskDiv(id);
            this.showAnswerDiv2(id+'oth');
            this.getOtherQuestion();
          } else if (res.message) {
            this.$message.error(res.message);
          } else {
            this.$message.error("提交失败，请重新提交！");
          }
        })
      },
      //删除回答
      deleteAsk(id){
        this.$confirm('您确定删除你的这条回答吗?', '提示', {type: 'warning'}).then(() => {
            courseApi.delete_ask(id,this.userId).then((res) => {
              if (res.success) {
                this.$message.success("删除成功");
                this.getOtherQuestion();
              } else if (res.message) {
                this.$message.error(res.message);
              } else {
                this.$message.error("删除失败！");
              }
            })
        })
      },
      //获取我的问答
      getMyQuestion() {
        courseApi.get_my_question(this.userId, this.courseId, this.chapter).then((res) => {
          if (res.success) {
            this.myQuestionList = this.setQuestionText(res.queryResult.list);
            if (this.myQuestionList.length != 0){
              this.findUserQuestionByIds(this.myQuestionList);
            }
            this.questionErrorCode = 0;
          } else {
            this.questionErrorCode = res.code;
          }
        })
      },
      findUserQuestionByIds(list){
        //根据userid取用户信息

        let user_ids = ''
        list.forEach(function (value) {
          let user_id = value.userId;
          user_ids += user_id + ',';
          var children = value.children;
          for(var i = 0; i < children.length; i++){
            let children_id = children[i].userId;
            user_ids +=children_id + ',';
          }
        });
        systemApi.user_findByIds(user_ids).then((res) => {
          if (res) {
            this.questionUserMap = res;
          }
        })
      },
      findOtherUserQuestionByIds(list){
        //根据userid取用户信息

        let user_ids = ''
        list.forEach(function (value) {
          let user_id = value.userId;
          user_ids += user_id + ',';
          var children = value.children;
          for(var i = 0; i < children.length; i++){
            let children_id = children[i].userId;
            user_ids +=children_id + ',';
          }
        });
        systemApi.user_findByIds(user_ids).then((res) => {
          if (res) {
            this.questionOtherUserMap = res;
          }
        })
      },
      //获取别人的问答
      getOtherQuestion() {
        courseApi.get_other_question(this.userId, this.courseId, this.chapter).then((res) => {
          if (res.success) {
            this.otherQuestionList = this.setQuestionText(res.queryResult.list);
            if (this.otherQuestionList.length != 0){
              this.findOtherUserQuestionByIds(this.otherQuestionList);
            }
            this.questionErrorCode = 0;
          } else {
            this.questionErrorCode = res.code;
          }
        })
      },
      getAllQuestion() {
        var num = 0;
        this.getMyQuestion();
        if (this.questionErrorCode != 0) {
          num += 1;
        }
        this.getOtherQuestion();
        if (this.questionErrorCode != 0 || num != 0) {
          this.$message.error("获取问答失败！")
        } else {
        }
      },
      //删除问题
      deleteQuestion(id) {
        this.$confirm('您确定删除你的该问题吗?', '提示', {type: 'warning'}).then(() => {
            courseApi.delete_question(id).then((res) => {
              if (res.success){
                this.$message.success("删除问题成功");
                this.getMyQuestion();
              } else if (res.message) {
                this.$message.error(res.message);
              } else {
                this.$message.error("系统繁忙，删除失败！");
              }
            })

        })
      },
      //发布评论
      publishComment() {
        if (this.comment.length == 0) {
          this.$message.warning("请先输入内容！");
          return;
        }
        this.score = $('.star-score i').text();
        courseApi.publish_commment(this.courseId, this.userId, this.score, this.comment).then((res) => {
          if (res.success) {
            this.$message.success("发布成功！");
            this.comment = '';
            this.remainComment=240;
            $('.star-score i').text(5);
            this.score = 5;
            document.getElementById("score1").style.width = "0px";
            this.getComment();
          } else if (res.message) {
            this.$message.error(res.message);
          } else {
            this.$message.error("发布失败，请重新发布！");
          }
        })
      },
      //获取评论
      getComment() {
        courseApi.get_comment(this.courseId).then((res) => {
          if (res.success) {
            this.commentList = this.setCommentText(res.queryResult.list);
            if (this.commentList.length != 0) {
              this.findUserCommentByIds(this.commentList);
            }
            this.commenErrorCode = 0;
          } else {
            this.commenErrorCode = res.code;
          }
        })
        setTimeout(function () {
          $('.star-show .score').map(function (n, i) {
            var x = Number($(this).find('i').text());
            var w = 113.5 * (1 - x / 5);
            $(this).css('width', w + 'px');
          })
        },100)

      },
      //刷新问答
      refreshQuestion() {
        var num = 0;
        this.getMyQuestion()
        if (this.questionErrorCode != 0) {
          num += 1;
        }
        this.getOtherQuestion()
        if (this.questionErrorCode != 0 || num != 0) {
          this.$message.error("刷新失败！")
        } else {
          this.$message.success("刷新成功")
        }
      },
      //刷新评论
      refreshComment() {
        this.getComment();
        if (this.commenErrorCode != 0) {
          this.$message.error("刷新失败！")
        } else {
          this.$message.success("刷新成功")
        }
      },
      //删除我的评论
      deleteComment(userId, id) {
        this.$confirm('您确定删除你的该条评论吗?', '提示', {type: 'warning'}).then(() => {
          courseApi.delete_comment(userId, id).then((res) => {
            if (res.success) {
              this.$message.success("删除评论成功");
              this.getComment();
            } else if (res.message) {
              this.$message.error(res.message);
            } else {
              this.$message.error("删除评论失败！");
            }
          })
        })
      },
      //提交我的笔记
      publishNotes() {
        if (this.notes.length == 0) {
          this.$message.warning("请先输入内容！");
          return;
        }
        courseApi.publish_notes(this.courseId, this.chapter, this.userId, this.notes).then((res) => {
          if (res.success) {
            this.$message.success("提交成功");
            this.notes = '';
            this.remainNotes = 500;
            this.getMyNotes();
          } else if (res.message) {
            this.$message.error(res.message);
          } else {
            this.$message.error("提交失败，请重新提交！");
          }
        })
      },
      //刷新笔记
      refreshNotes() {
        var num = 0;
        this.getMyNotes();
        if (this.errorCode != 0) {
          num += 1;
        }
        this.getOtherNotes();
        if (this.errorCode != 0 || num != 0) {
          this.$message.error("刷新失败！")
        } else {
          this.$message.success("刷新成功")
        }
      },
      myThumbsUp() {
        this.$message.warning("您不能给自己的笔记点赞！")
      },
      thumbsUp(id) {
        courseApi.thumbsUp(id).then((res) => {
          if (res.success) {
            this.$message.success("为TA点赞成功")
            this.getOtherNotes();
          } else if (res.message) {
            this.$message.error(res.message)
          } else {
            this.$message.error("系统繁忙，点赞失败！")
          }
        })
      },
      getNotes() {
        var num = 0;
        this.getMyNotes();
        if (this.errorCode != 0) {
          num += 1;
        }
        this.getOtherNotes();
        if (this.errorCode != 0 || num != 0) {
          this.$message.error("获取笔记失败！")
        } else {
        }
      },
      setText(list) {
        for (var i = 0; i < list.length; i++) {
          var newNotes = list[i].notes;
          newNotes = newNotes.replace(/ /g, "&nbsp;");
          newNotes = newNotes.replace(/\n/g, "<br>");
          list[i].notes = newNotes;
        }
        return list;
      },
      setCommentText(list) {
        for (var i = 0; i < list.length; i++) {
          var newComment = list[i].comment;
          newComment = newComment.replace(/ /g, "&nbsp;");
          newComment = newComment.replace(/\n/g, "<br>");
          list[i].comment = newComment;
        }
        return list;
      },
      setQuestionText(list) {
        for (var i = 0; i < list.length; i++) {
          var newContent = list[i].content;
          newContent = newContent.replace(/ /g, "&nbsp;");
          newContent = newContent.replace(/\n/g, "<br>");
          list[i].content = newContent;
          var newTitle = list[i].title;
          newTitle = newTitle.replace(/ /g, "&nbsp;");
          list[i].title = newTitle;
          if (list.children != null) {
            for (var i = 0; i < list.children.length; i++) {
            }
            var newContentChild = list.children[i].content;
            newContentChild = newContentChild.replace(/ /g, "&nbsp;");
            newContentChild = newContentChild.replace(/\n/g, "<br>");
            list.children[i].content = newContentChild;
          }
        }
        return list;
      },
      getMyNotes() {
        courseApi.get_my_notes(this.userId, this.courseId, this.chapter).then((res) => {
          if (res.success) {
            this.myNotesList = this.setText(res.queryResult.list);
            this.errorCode = 0;
          } else {
            this.errorCode = res.code;
          }
        })
      },
      getOtherNotes() {
        courseApi.get_other_notes(this.userId, this.courseId, this.chapter).then((res) => {
          if (res.success) {
            this.otherNotesList = this.setText(res.queryResult.list);
            if (this.otherNotesList.length != 0) {
              this.findUserByIds(this.otherNotesList)
            }
            this.errorCode = 0;
          } else {
            this.errorCode = res.code;
          }
        })
      },
      findUserByIds: function (list) {
        //根据userid取用户信息
        let user_ids = ''
        list.forEach(function (value) {
          let user_id = value.userId;
          user_ids += user_id + ',';
        });
        systemApi.user_findByIds(user_ids).then((res) => {
          if (res) {
            this.userMap = res;
          }
        })
      },
      findUserCommentByIds: function (list) {
        //根据userid取用户信息
        let user_ids = ''
        list.forEach(function (value) {
          let user_id = value.userId;
          user_ids += user_id + ',';
        });
        systemApi.user_findByIds(user_ids).then((res) => {
          if (res) {
            this.commentUserMap = res;
          }
        })
      },
      deleteNotes(id) {
        this.$confirm('您确定删除该笔记吗?', '提示', {type: 'warning'}).then(() => {
          courseApi.delete_notes(id).then((res) => {
            if (res.success) {
              this.$message.success("删除笔记成功");
              this.getMyNotes();
            } else if (res.message) {
              this.$message.error(res.message);
            } else {
              this.$message.error("删除笔记失败！");
            }
          })
        })
      },
      //取出第一个章节
      getFirstTeachplan() {
        for (var i = 0; i < this.teachplanList.length; i++) {
          let firstTeachplan = this.teachplanList[i];
          if (firstTeachplan.children && firstTeachplan.children.length > 0) {
            let secondTeachplan = firstTeachplan.children[0];
            return secondTeachplan.id;
          }
        }
        return;
      },
      getChapterName() {
        courseApi.get_chapter(this.chapter).then((res) => {
          if (res) {
            this.chapterName = res.pname;
          }
        })
      },
      //开始学习
      study(chapter) {
        this.chapter = chapter;
        // 获取播放地址
        courseApi.get_media(this.courseId, chapter).then((res) => {
          if (res.success) {
            let fileUrl = sysConfig.videoUrl + res.fileUrl
            this.getChapterName();
            //播放视频             
            this.playvideo(fileUrl)
            //取出笔记
            this.getNotes();
            //取出问答
            this.getAllQuestion();
            //取出评论
            this.getComment();
          } else if (res.message) {
            this.$message.error(res.message)
          } else {
            this.$message.error("播放视频失败，请刷新页面重试")
          }
        }).catch(res => {
          this.$message.error("播放视频失败，请刷新页面重试")
        });
      }
    },
    created() {
      let activeUser = utilApi.getActiveUser();
      if (activeUser) {
        this.userId = activeUser.userid;
      }
      //当前请求的url
      this.url = window.location
      //课程id
      this.courseId = this.$route.params.courseId
      //章节id
      this.chapter = this.$route.params.chapter
      //取出课程Id
      systemApi.course_view(this.courseId).then((view_course) => {
        if (!view_course || !view_course[this.courseId]) {
          this.$message.error("获取课程信息失败，请重新进入此页面！")
          return;
        }
        let courseInfo = view_course[this.courseId]
        // console.log(courseInfo)
        this.coursename = courseInfo.name
        if (courseInfo.teachplan) {
          let teachplan = JSON.parse(courseInfo.teachplan);
          this.teachplanList = teachplan.children;
          if (!this.chapter || this.chapter == '0') {
            // 取出第一个教学计划
            this.chapter = this.getFirstTeachplan()
            //console.log(this.chapter)
            //开始学习
            this.study(this.chapter)
          } else if (!this.chapter || this.chapter != '0') {
            this.study(this.chapter)
          }
        }
      })
    },
    beforeMount(){
      this.getComment();
    },
    mounted() {
      $(function () {
        $('.active-box span').click(function () {
          $(this).css({
            'color': '#00a4ff'
          })
          if ($(this).find('i').hasClass('i-laud')) {
            $(this).find('.i-laud').css('background-position', '-80px -19px')
          } else if ($(this).find('i').hasClass('i-coll')) {
            $(this).find('.i-coll').css('background-position', '1px -75px')
          }
        })
        $('.learing-box .item-list').mouseover(function (e) {
          $(this).css({
            'height': '140px'
          }).addClass('hov').siblings().css({
            'height': '50px'
          })
          $(this).siblings().removeClass('hov')
        })
        $('.learing-box .item-box').mouseout(function () {
          $(this).find('.item-list:first').css({
            'height': '140px'
          }).addClass('hov')
          $(this).find('.item-list:first').siblings().css({
            'height': '50px'
          }).removeClass('hov')
        })
      })


      $(function () {
        $('.learing-box .item-list').mouseover(function (e) {
          $(this).css({
            'height': '140px'
          }).addClass('hov').siblings().css({
            'height': '50px'
          })
          $(this).siblings().removeClass('hov')
        })
        $('.learing-box .item-box').mouseout(function () {
          $(this).find('.item-list:first').css({
            'height': '140px'
          }).addClass('hov')
          $(this).find('.item-list:first').siblings().css({
            'height': '50px'
          }).removeClass('hov')
        })
      })

      $(function () {
        //代码点击显示
        $(".item .item-left").click(function () {
          var pre = $(this).parent();
          if (!pre.find('pre').hasClass('code-pop')) {
            pre.find('pre').addClass('code-pop');
            pre.find('.mask,pre').css('display', 'block')
          } else {
            pre.find('pre').removeClass('code-pop');
            pre.find('.mask,pre').css('display', 'none')
          }
        });
        //代码切换
        $('.content-title p a').click(function () {
          $(this).addClass('all').siblings().removeClass('all');
        })

        $('.learing-box .item-list').mouseover(function (e) {
          $(this).css({
            'height': '140px'
          }).addClass('hov').siblings().css({
            'height': '50px'
          })
          $(this).siblings().removeClass('hov')
        })
        $('.learing-box .item-box').mouseout(function () {
          $(this).find('.item-list:first').css({
            'height': '140px'
          }).addClass('hov')
          $(this).find('.item-list:first').siblings().css({
            'height': '50px'
          }).removeClass('hov')
        })
      })

      $(function () {
        //评分
        $('.star-show .score').map(function (n, i) {
          var x = Number($(this).find('i').text());
          var w = 113.5 * (1 - x / 5);
          $(this).css('width', w + 'px');
        })
        //评论打分
        $('.evaluate .star').mousemove(function (e) {
          var startX = $(this).offset().left;
          var movX = e.clientX - startX + 0.5;
          var w = 145 * (1 - movX / 145);
          $(this).find('.score').css('width', w + 'px');
          $('.star-score i').text((movX / 145 * 5).toFixed(1))
        })
        //星级评分
        $('.grade').map(function (n, i) {
          var pret = $(this).find('.percent-num i').text();
          var wt = $(this).find('.grade-percent').width();
          $(this).find('.grade-percent span').css('width', wt * pret / 100);
        })


      })

      $(function () {
        var vidHit = $('html').height() - 0;
        var vidCenHit = (vidHit - $('.video-play').height()) / 2;
        var vdwt = $('.video').width();
        var wt = 300;

        $('.course-cont-top-video,.video').css('height', vidHit);
        $('.video').css('height', vidHit - 50);


        $('.note-cont').css('height', vidHit - $('.note-box .note').height() - 65);

        $(window).resize(function () {
          $('.course-cont-top-video,.video').css('height', vidHit);
          $('.video').css('height', vidHit - 50);
//      $('#video-player').height(vidHit - 70);
          $('.nodte-cont').css('height', vidHit - $('.note-box .note').height() - 65);
        });
        $(window).resize();

        //还原初始状态-控制器
        function setStart(obj) {
          if (obj === 'ck') { //左导航
            setnt()
            setak()
            setcm()
            setnav()
          } else if (obj === 'nt') { // 笔记
            setck()
            setak()
            setcm()
            setnav()
          } else if (obj === 'ak') { // 问答
            setck()
            setnt()
            setcm()
            setnav()
          } else if (obj === 'cm') { // 评论
            setck()
            setnt()
            setak()
            setnav()
          } else if (obj === 'nv') { // 目录
            setck()
            setnt()
            setcm()
            setak()
          }
        }

        function setck() {
          if ($('.video-box .glyphicon-align-justify').hasClass('ck')) {
            $('.video-box .glyphicon-align-justify').removeClass('ck');
            $('.video-box').animate({
              width: '100%'
            }, 500)
            $('.course-nav').animate({
              'right': "0px"
            }, 0)
            $('.course-weeklist').animate({
              left: -wt
            }, 500)
          }
        }

        function setnt() {
          if ($('.course-nav .lab-note').hasClass('nt')) {
            $('.course-nav .lab-note').removeClass('nt');
            $('.note').animate({
              'width': "0"
            }, 500);
            $('.course-nav').animate({
              'right': "0px"
            }, 0)
            $('.video').animate({
              'width': '100%'
            }, 500);
          }
        }

        //
        function setnav() {
          if ($('.course-nav .nav').hasClass('nv')) {
            $('.course-nav .nav').removeClass('nv');
            $('.navCont').animate({
              'width': "0"
            }, 500);
            $('.course-nav').animate({
              'right': "0px"
            }, 0)
            $('.video').animate({
              'width': '100%'
            }, 500);
          }
        }

        //
        function setak() {
          if ($('.course-nav .lab-ask').hasClass('ak')) {
            $('.course-nav .lab-ask').removeClass('ak');
            $('.ask').animate({
              'width': "0"
            }, 500);
            $('.course-nav').animate({
              'right': "0px"
            }, 0)
            $('.video').animate({
              'width': '100%'
            }, 500);
          }
        }

        // 讲义
        function setcm() {
          if ($('.course-nav .lab-com').hasClass('cm')) {
            $('.course-nav .lab-com').removeClass('cm');
            $('.com').animate({
              'width': "0"
            }, 500);
            $('.course-nav').animate({
              'right': "0px"
            }, 0)
            $('.video').animate({
              'width': '100%'
            }, 500);
          }
        }

        //
        $('.note-box .problem').click(function () {
          alert('wenda')
          if (!$(this).hasClass('ck')) {
            $(this).addClass('ck');
            $(this).find('p').css('display', 'block')
            $('.note-cont').css('height', vidHit - $('.note-box .note').height() - 65);
          } else {
            $(this).removeClass('ck');
            $(this).find('p').css('display', 'none')
            $('.note-cont').css('height', vidHit - $('.note-box .note').height() - 65);
          }
        });
        //
        var reht = $(".video-box .resou-box").height();
        $(".video-box .pull-right").click(function () {
          if (!$(this).hasClass('ck')) {
            $(this).addClass('ck');
            $(".video-box .resources").animate({
              height: reht
            }, 500)
          } else {
            $(this).removeClass('ck');
            $(".video-box .resources").animate({
              height: 0
            }, 500)
          }
        })
        //笔记切换
        $('.note-box .note-lab span, .ask-box .note-lab span').click(function () {
          $(this).addClass('active').siblings().removeClass('active')
          if ($(this).index() == 1) {
            $('.note-item-cont').animate({
              'left': -400
            }, 500)
          } else {
            $('.note-item-cont').animate({
              'left': 0
            }, 500)
          }
        })
        //笔记部分处理
        var myNtHt = $('.my-note .textarea-box').height();
        $('.my-note .my-item-box').css('height', $('.note-box').height() - myNtHt - 160 + "px");
        $('.sel-note .my-item-box').css('height', $('.note-box').height() - 160 + "px");
        $('.course-nav .lab-note').click(function () {
          window.location = '#'
          setStart('nt');
          if (!$(this).hasClass('nt')) {
            $(this).addClass('nt');
            $('.note').animate({
              'width': "400px"
            }, 500)
            $('.course-nav').animate({
              'right': "401px"
            }, 500)
            $('.video').animate({
              'width': vdwt - 380 + 'px'
            }, 500);
          } else {
            $(this).removeClass('nt');
            $('.note').animate({
              'width': "0"
            }, 500);
            $('.course-nav').animate({
              'right': "0px"
            }, 500)
            $('.video').animate({
              'width': '100%'
            }, 500);
          }
        })
        //目录
        $('.course-nav .nav').click(function () {
          window.location = '#'
          setStart('nv');
          if (!$(this).hasClass('nv')) {
            $(this).addClass('nv');
            $('.navCont').animate({
              'width': "300px"
            }, 500)
            $('.course-nav').animate({
              'right': "301px"
            }, 500)
            $('.video').animate({
              'width': vdwt - 280 + 'px'
            }, 500);
          } else {
            $(this).removeClass('nv');
            $('.navCont').animate({
              'width': "0"
            }, 500);
            $('.course-nav').animate({
              'right': "0px"
            }, 500)
            $('.video').animate({
              'width': '100%'
            }, 500);
          }
        })
        // 问答
        $('.course-nav .lab-ask').click(function () {
          window.location = '#'
          setStart('ak');
          if (!$(this).hasClass('ak')) {
            $(this).addClass('ak');
            $('.ask').animate({
              'width': "400px"
            }, 500)
            $('.course-nav').animate({
              'right': "401px"
            }, 500)
            $('.video').animate({
              'width': vdwt - 380 + 'px'
            }, 500);
          } else {
            $(this).removeClass('ak');
            $('.ask').animate({
              'width': "0"
            }, 500);
            $('.course-nav').animate({
              'right': "0px"
            }, 500)
            $('.video').animate({
              'width': '100%'
            }, 500);
          }
        })
        // 评论
        $('.course-nav .lab-com').click(function () {
          window.location = '#'
          setStart('cm');
          if (!$(this).hasClass('cm')) {
            $(this).addClass('cm');
            $('.com').animate({
              'width': "400px"
            }, 500)
            $('.course-nav').animate({
              'right': "401px"
            }, 500)
            $('.video').animate({
              'width': vdwt - 380 + 'px'
            }, 500);
          } else {
            $(this).removeClass('cm');
            $('.com').animate({
              'width': "0"
            }, 500);
            $('.course-nav').animate({
              'right': "0px"
            }, 500)
            $('.video').animate({
              'width': '100%'
            }, 500);
          }
        })

      })

    }
  }

</script>

<style>
  @import './../../../../static/plugins/normalize-css/normalize.css';
  /*@import './../../../../static/plugins/bootstrap/dist/css/bootstrap.css';*/
  @import './../../../../static/css/page-learing-personal.css';
  @import './../../../../static/css/page-learing-course-videoes.css';
  @import './../../../../static/plugins/rainbow.css';
  /*@import './../../../../static/plugins/videojs/video-js.css';*/
  .playbackView {
    position: relative;
  }

  .optionsWrapper {
    width: 500px;
    margin: 20px auto;
  }

  .video-js {
    position: inherit;
  }

  .learing-course {
    background: #000;
  }

  .nav > li > a {
    position: relative;
    display: unset;
    padding: 10px 15px;
    /*    color: #ebeef5;*/
  }

  /*  .nav > li > a:hover { background-color:#00a4ff; }*/

</style>
