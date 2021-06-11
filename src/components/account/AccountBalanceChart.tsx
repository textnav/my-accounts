import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Transaction } from "../../redux/account/account.reducer";

export default function AccountBalanceChart(props: { data: Transaction[] }) {
  const data = props.data;
  return data.length ? (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={400}
        data={props.data.map((item) => ({
          ...item,
          timestamp: new Date(item.timestamp).toLocaleString(),
        }))}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" domain={["auto", "auto"]} name="Time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="balance" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <></>
  );
}
