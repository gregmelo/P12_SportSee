import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import './TodayScore.scss';

const COLORS = ['#E60000', '#FFFFFF'];

export default function TodayScore({todayScore}) {

  const data = [
    { name: 'Score', value: todayScore * 100 },
    { name: 'Reste', value: 100 - todayScore * 100 },
  ];
  console.log('data in TodayScore component: ', data);

    return (
      <div className="today-score">
      <h2>Score</h2>
      <ResponsiveContainer>
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={80}
          fill="#8884d8"
          cornerRadius={10}
          dataKey="value"
          startAngle={90}
          endAngle={90 + 360}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      </ResponsiveContainer>
      <div className="legende">
				<p className="score">
					{todayScore * 100}%
				</p>
				<p>de votre</p>
				<p>objectif</p>
			</div>
      </div>
    );
  }

TodayScore.propTypes = {
  todayScore: PropTypes.number,
};
