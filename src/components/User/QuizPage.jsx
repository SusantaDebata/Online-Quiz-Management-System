import { useLocation } from 'react-router-dom';
import UserNavbar from '../Navbar/UserNavbar'
import { useEffect } from 'react';
import { useState } from "react"
import { GetAllQuizzes, GetQuizbyId } from '../../Services/Questionquiz';
import Quiz from './Quiz';
import './Style/Flex.css'
import { AddPerformance, GetPerformancebyuid, GetallPerformance, UpdatePerformance } from '../../Services/PerformanceService';

const QuizPage = () => {
  const [quizList, setQuizList] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  // const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");
  const [quizQuest, setQuizQuest] = useState([]);
  const [i, setI] = useState(0);
  const [currenttotal, setCurrenttotal] = useState(0);
  const [modify, setModify] = useState(0);

  const [Ctech, setCtech] = useState(0);
  const [Cpptech, setCpptech] = useState(0);
  const [Cshtech, setCshtech] = useState(0);
  const [Javatech, setJavatech] = useState(0);
  const [Dotnettech, setDotnettech] = useState(0);
  const [Pythontech, setPythontech] = useState(0);
  const [Jstech, setJstech] = useState(0);
  const [Reacttech, setReacttech] = useState(0);
  const [Angulartech, setAngulartech] = useState(0);
  const [Rusttech, setRusttech] = useState(0);
  const [Kotlintech, setKotlinech] = useState(0);
  const [ExJstech, setExJstech] = useState(0);

  const location = useLocation();
  const username = location.state?.username;
  const uid = window.sessionStorage.getItem("user");
  console.log(uid)


  useEffect(() => {
    fetchQuizList();
  }, []);

  useEffect(() => {
    // console.log("Selected Quiz:", selectedQuiz);
    if (selectedQuiz) {
      fetchQuizQuest(selectedQuiz);
    }
  }, [selectedQuiz]);

  //fetching list of quiz
  const fetchQuizList = async () => {
    try {
      // const response = await axios.get("http://localhost:8080/api/quizzes");
      const response = await GetAllQuizzes();
      setQuizList(response.data);
    } catch (error) {
      setError("Failed to fetch quiz list");
    }
  };

  const fetchQuizQuest = async (quizId) => {
    try {
      // const response = await axios.get(
      //   `http://localhost:8080/api/quizzes/getQuizQuestById/${quizId}`
      // );
      const response = await GetQuizbyId(quizId);
      console.log(response.data);
      setQuizQuest(response.data);
      // setSelectedOptions([]);
    } catch (error) {
      setError("Failed to fetch quiz questions");
    }
  };

  async function handleperformance() {
    let olduser = 0;
    try {
      const res = await GetallPerformance();
      {res.data.map((performance) => {

      if (performance.uid == uid) {
        console.log("if block executed");
        olduser = olduser + 1;
      }

    })}

      if (olduser == 0) {
        console.log(olduser + "  Add block executed")
        const newuserperformancedata = {
          uid,
          Ctech,
          Cpptech,
          Cshtech,
          Javatech,
          Dotnettech,
          Pythontech,
          Jstech,
          Reacttech,
          Angulartech,
          Rusttech,
          Kotlintech,
          ExJstech
        };
        await AddPerformance(newuserperformancedata);
      }
    } catch (error) {
      console.error("Error handling performance data:", error);
    }
  }

  // function addItem(arr){
  //   setAllperformance((prevArray) => [...prevArray,...arr])
  // }

  const handleTechnologyChange = (e) => {
    setSelectedTechnology(e.target.value);
    setSelectedQuiz("");
    setCurrenttotal(0);
    setQuizQuest([]);
    handleperformance();
  };

  const handleQuizChange = (e) => {
    setSelectedQuiz(e.target.value);
    obtainoldperformance();
  };

  const obtainoldperformance = async() => {
    const response = await GetPerformancebyuid(uid);
    let c = selectedTechnology;
    switch (c) {
      case 'C':
        setCtech(response.ctech);
        break
      case 'C++':
        setCpptech(response.cpptech);
        break
      case 'C#':
        setCshtech(response.cshtech);
        break
      case 'Java':
        setJavatech(response.javatech);
        break
      case 'Python':
        setPythontech(response.pythontech);
        break
      case '.NET':
        setDotnettech(response.dotnettech);
        break
      case 'JavaScript':
        setJstech(response.jstech);
        break
      case 'React':
        setReacttech(response.reacttech);
        break
      case 'Angular':
        setAngulartech(response.angulartech);
        break
      case 'Rust':
        setRusttech(response.rusttech);
        break
      case 'Kotlin':
        setKotlinech(response.kotlintech);
        break
      case 'Express Js':
        setExJstech(response.exJStech);
        break
      default:
        console.log("The Technology is not found.");
    }
  }

  if (error) {
    return <div>`${error}</div>;
  }

  const distinctTechnologies = [
    ...new Set(quizList.map((quiz) => quiz.technology)),
  ];

  const updatetechmark = () => {
    let c = selectedTechnology;
    let percent = (currenttotal / quizQuest.length) * 100;
    switch (c) {
      case 'C':
        if(Ctech > percent)
        setCtech(percent);
      setModify(1);
        break
      case 'C++':
        if(Cpptech > percent)
        setCpptech(percent);
        setModify(1);
        break
      case 'C#':
        if(Cshtech > percent)
        setCshtech(percent);
        setModify(1);
        break
      case 'Java':
        if(Javatech > percent)
        setJavatech(percent);
        setModify(1);
        break
      case 'Python':
        if(Pythontech > percent)
        setPythontech(percent);
        setModify(1);
        break
      case '.NET':
        if(Dotnettech > percent)
        setDotnettech(percent);
        setModify(1);
        break
      case 'JavaScript':
        if(Jstech > percent)
        setJstech(percent);
        setModify(1);
        break
      case 'React':
        if(Reacttech > percent)
        setReacttech(percent);
        setModify(1);
        break
      case 'Angular':
        if(Angulartech > percent)
        setAngulartech(percent);
        setModify(1);
        break
      case 'Rust':
        if(Rusttech > percent)
        setRusttech(percent);
        setModify(1);
        break
      case 'Kotlin':
        if(Kotlintech > percent)
        setKotlinech(percent);
        setModify(1);
        break
      case 'Express Js':
        if(ExJstech > percent)
        setExJstech(percent);
        setModify(1);
        break
      default:
        console.log("The Technology is not found.");
    }
    checkmodify();
  }

  const checkmodify = async() => {
    if(modify == 1){
      const updatedperformancedata = {
        uid,
        Ctech,
        Cpptech,
        Cshtech,
        Javatech,
        Dotnettech,
        Pythontech,
        Jstech,
        Reacttech,
        Angulartech,
        Rusttech,
        Kotlintech,
        ExJstech
      };
      try{
        await UpdatePerformance(uid,updatedperformancedata);
      }catch(e){
        console.log("Error in updation");
      }
    }
  }

  return (
    <div>
      <UserNavbar username={username} />
      <div className="container">
        <h2 className="mt-3">Quiz</h2>
        <form className="mt-3">
          <div className="mb-3">
            <label className="form-label">Select Technology:</label>
            <select
              className="form-select"
              value={selectedTechnology}
              onChange={handleTechnologyChange}
            >
              <option value="">Select</option>
              {distinctTechnologies.map((technology) => (
                <option key={technology} value={technology}>
                  {technology}
                </option>
              ))}
            </select>
          </div>
          {selectedTechnology && (
            <div className="mb-3">
              <label className="form-label">Select Quiz:</label>
              <select
                className="form-select"
                value={selectedQuiz}
                onChange={handleQuizChange}
              >
                <option value="">Select</option>
                {quizList
                  .filter((quiz) => quiz.technology === selectedTechnology)
                  .map((quiz) => (
                    <option key={quiz.id} value={quiz.id}>
                      {quiz.quizName}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {selectedQuiz && quizQuest.length > 0 && (
            <div>
              <div className='flexbox'>{((i + 1) <= quizQuest.length) ? <h4>Quiz Questions: &emsp;&emsp;<div>{i + 1}/{quizQuest.length}</div></h4> : <h3>Result: </h3>} </div>
              <br />
              {((i + 1) <= quizQuest.length) ? < Quiz key={i} question={quizQuest[i]} quizQuest={quizQuest} uid={uid} errordis={(error) => { setError(error) }} current={i} onSubmit={(val) => { setI(val) }} updatemarks={(val) => { 
                let marks = currenttotal + val;
                setCurrenttotal(marks) 
              }} /> :
                <div className='result'>
                  {updatetechmark()}
                  Quiz Finished. Thanks for participating.
                  <br/>
                  <b>Your Score : </b> {currenttotal} / {quizQuest.length}
                </div>}
            </div>
          )}
          <br />
        </form>
      </div>
    </div>
  );
};


export default QuizPage
