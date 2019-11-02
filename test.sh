#!/bin/bash

: <<'END'
사용법
  ./test.sh -afbl 과 같은 방식으로 실행
  옵션:
    -a: frontend, backend 모두 테스트
    -f: frontend 테스트
    -b: backend 테스트
    -l: lint 체크 (afb 없이 실행한다면 실행한 위치에 따라 lint 체크)
  옵션 없이 실행한다면 실행한 위치에 따라 자동으로 테스트 + lint 체크
    root: -al
    front: -fl
    back: -bl
END

# 디버깅용
shopt -s expand_aliases
alias trace_on='set -x'
alias trace_off='{ set +x; } 2>/dev/null'

# 색상 코드
LIGHT_CYAN='\033[1;36m'
NC='\033[0m'

# frontend, backend 디렉토리 이름
front_dir_name="front"
back_dir_name="back"

shell_path=$(pwd)
relative_path=$(dirname "$0")
shell_dir_name=$(basename $(pwd))
root_path="${shell_path}/${relative_path}" # 쉘스크립트파일의 절대경로(워크스페이스의 루트 디렉토리)
front_path="${root_path}/${front_dir_name}"
back_path="${root_path}/${back_dir_name}"
# backend/모듈 디렉토리 이름
module_name="matchmaker"

do_test_front=false
do_test_back=false
do_lint_check=false
do_lint_check_front=false
do_lint_check_back=false

pylintrc="${back_path}/.pylintrc"

if [ $# -eq 1 ]; then
  while getopts "afbl" opt; do
    case $opt in
    a)
      do_test_front=true
      do_test_back=true
      ;;
    f)
      do_test_front=true
      ;;
    b)
      do_test_back=true
      ;;
    l)
      do_lint_check=true
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
      # TODO: 테스트할 파일명 인자로 받기?
      #:)
      #echo "Option -$OPTARG requires an argument." >&2
      #;;
    esac
  done
  shift $((OPTIND - 1))

  if ! ${do_test_front} && ! ${do_test_back} && ${do_lint_check}; then
    if [ ${shell_dir_name} = ${front_dir_name} ]; then
      do_lint_check_front=true
    elif [ ${shell_dir_name} = ${back_dir_name} ]; then
      do_lint_check_back=true
    else
      do_lint_check_front=true
      do_lint_check_back=true
    fi
  fi

elif [ $# -eq 0 ]; then
  if ! ${do_test_front} && ! ${do_test_back}; then
    if [ ${shell_dir_name} = ${front_dir_name} ]; then
      do_test_front=true
    elif [ ${shell_dir_name} = ${back_dir_name} ]; then
      do_test_back=true
    else
      do_test_front=true
      do_test_back=true
    fi
    do_lint_check=true
  fi
else
  echo "Too many arguments" >&2
  exit
fi

if ${do_test_front} || ${do_lint_check_front}; then
  if ${do_test_front}; then
    echo "-------------"
    echo -e "${LIGHT_CYAN}Test frontend${NC}"
    echo "-------------"
    (yarn --cwd="${front_path}" test --coverage --watchAll=false)
    echo ""
  fi
  if ${do_lint_check}; then
    echo "--------------------------"
    echo -e "${LIGHT_CYAN}Check frontend lint errors${NC}"
    echo "--------------------------"
    (yarn --cwd="${front_path}" lint)
    echo ""
  fi
fi
if ${do_test_back} || ${do_lint_check_back}; then
  if ${do_test_back}; then
    echo "------------"
    echo -e "${LIGHT_CYAN}Test backend${NC}"
    echo "------------"
    (python ${back_path}/manage.py test ${back_path})
    echo ""
    temp_COVERAGE_FILE=${COVERAGE_FILE}
    export COVERAGE_FILE="${back_path}/.coverage"

    (coverage report --fail-under=80 -m)
    echo ""
    export COVERAGE_FILE=${temp_COVERAGE_FILE}
  fi
  if ${do_lint_check}; then
    temp_PYLINTRC=${pylintrc}
    export PYLINTRC=${pylintrc}
    echo "-------------------------"
    echo -e "${LIGHT_CYAN}Check backend lint errors${NC}"
    echo "-------------------------"
    (pylint ${back_path}"/"${module_name})
    echo ""
    export PYLINTRC=${temp_PYLINTRC}
  fi
fi