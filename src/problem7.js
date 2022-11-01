function problem7(user, friends, visitors) {
  var answer;

  // 위반사항 검사
  if (violationChk) {
    // user와 friends 배열을 비교해 친구 리스트를 만드는 함수
    var friendsArr = makeFriendsArr(user, friends);
    // 친구리스트와 friends 배열을 비교해 추천 후보의 아이디와 점수를 가지는 리스트 객체를 만드는 함수
    var candidates = candidateMap(user, friendsArr, friends);
    // 추천 후보 리스트에 타임라인 방문 점수 합산
    var score = timeLineChk(candidates, visitors);

    // 합산 결과 상위 5명의 배열 리스트를 리턴
    answer = recommandArr(score);
  } else {
    answer = -1;
  }

  return answer;
}

function violationChk(user, friends, visitors) {
  var userChk = userChecker(user);
  var friendsChk = friendsChecker(friends);
  var visitorsChk = visitorsChecker(visitors);

  return userChk && friendsChk && visitorsChk;
}

function userChecker(user) {
  // user의 길이가 1 ~ 30 이하 인지 검사
  if (user.length >= 1 && user.length <= 30) {
    return true;
  } else {
    return false;
  }
}

function friendsChecker(friends) {
  var result = true;

  // friends 배열의 길이가 1 ~ 10000 인지 확인
  if (friends.length >= 1 && friends.length <= 10000) {
    for (var i = 0; i < friends.length; i++) {
      // friends의 각 원소의 길이가 2인지 확인
      if (!(friends[i].length === 2)) {
        result = false;
        break;
      }

      // 각 원소 안의 두 개의 아이디의 길이가 모두 1 ~ 30 인지 확인
      if (friends[i][0].length >= 1 && friends[i][0].length <= 30) {
        if (friends[i][1].length >= 1 && friends[i][1].length <= 30) {
          // 두 개의 아이디가 모두 알파벳 소문자인지 확인
          if (friends[i][0] === friends[i][0].toLowerCase()) {
            if (!(friends[i][1] === friends[i][1].toLowerCase())) {
              result = false;
              break;
            }
          } else {
            result = false;
            break;
          }
        } else {
          result = false;
          break;
        }
      } else {
        result = false;
        break;
      }
    }
  } else {
    result = false;
  }

  return result;
}

function visitorsChecker(visitors) {
  // visitors의 길이가 0 ~ 10000 이하 인지 검사
  if (visitors.length >= 0 && visitors.length <= 10000) {
    return true;
  } else {
    return false;
  }
}

// user와 비교하여 친구 목록을 배열로 만드는 함수
function makeFriendsArr(user, friends) {
  var frendsList = new Set();

  for (var i = 0; i < friends.length; i++) {
    // 배열의 첫 번째에 user가 있는 경우
    if (friends[i][0] === user) {
      frendsList.add(friends[i][1]);
    }
    // 배열의 두 번째에 user가 있는 경우
    else if (friends[i][1] === user) {
      frendsList.add(friends[i][0]);
    }
  }

  return Array.from(frendsList);
}

// friends 배열 중에 추천할 유저의 아이디와 점수를 계산해서 map으로 리턴
function candidateMap(user, friendsArr, friends) {
  var candidates = new Map();

  for (var i = 0; i < friendsArr.length; i++) {
    for (var j = 0; j < friends.length; j++) {
      // 배열의 첫 번째에 친구가 있는 경우
      if (friends[j][0] === friendsArr[i]) {
        // 추천할 아이디가 user와 같은지 확인
        if (!(friends[j][1] === user)) {
          // 추천할 아이디가 map에 이미 있는지 확인
          if (candidates.has(friends[j][1])) {
            // 있으면 기존 점수에 +10
            candidates.set(friends[j][1], candidates.get(friends[j][1]) + 10);
          } else {
            // 없으면 map에 아이디와 점수 10을 map에 저장
            candidates.set(friends[j][1], 10);
          }
        }
      }
      // 배열의 두 번째에 친구가 있는 경우
      else if (friends[j][1] === friendsArr[i]) {
        // 추천할 아이디가 user와 같은지 확인
        if (!(friends[j][0] === user)) {
          // 추천할 아이디가 map에 이미 있는지 확인
          if (candidates.has(friends[j][0])) {
            // 있으면 기존 점수에 +10
            candidates.set(friends[j][0], candidates.get(friends[j][0]) + 10);
          } else {
            // 없으면 map에 아이디와 점수 10을 map에 저장
            candidates.set(friends[j][0], 10);
          }
        }
      }
    }
  }

  return candidates;
}

module.exports = problem7;
